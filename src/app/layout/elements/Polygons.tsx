import { useCallback, useEffect, useMemo, useState } from 'react';
import { random } from '!/utils/math';

import Floating, { FloatingModeType } from '!/app/misc/Floating';
import Polygon from '!/app/misc/Polygon';

type PolygonType = {
	x: number;
	y: number;
	width: number;
};

interface PolygonsProps {
	mode?: FloatingModeType;
	ratio?: number;
	min?: number;
	max?: number;
	minSize?: number;
	maxSize?: number;
	margin?: number;
}

const Polygons = ({
	mode = 'attract',
	ratio = 20,
	min = 1,
	max = 3,
	minSize = 20,
	maxSize = 40,
	margin = 0,
}: PolygonsProps) => {
	const [polygons, setPolygons] = useState<PolygonType[]>([]);

	const total = useMemo(() => Math.floor(random({ min, max })), [min, max]);

	const randomWidthPercentage = useCallback(() => {
		const supposedSize = 100 / total;
		const randomSize = random({
			min: Math.max(minSize, supposedSize),
			max: Math.max(maxSize, supposedSize),
		});
		return Math.round(randomSize * 100) / 100;
	}, [total, minSize, maxSize]);

	useEffect(() => {
		if (!total) return;

		const attempts = 30;
		const polygons: PolygonType[] = [];

		for (let k = 0; k < total; k++) {
			let placed = false;

			for (let tryCount = 0; tryCount < attempts; tryCount++) {
				const widthPercentage = randomWidthPercentage();
				const x =
					Math.round(
						random({ min: 0, max: 100 - widthPercentage }) * 100
					) / 100;
				const y =
					Math.round(
						random({ min: 0, max: 100 - widthPercentage }) * 100
					) / 100;

				const overlaps = polygons.some((existing) => {
					const buffer = margin;

					const leftA = x - buffer;
					const rightA = x + widthPercentage + buffer;
					const topA = y - buffer;
					const bottomA = y + widthPercentage + buffer;

					const leftB = existing.x;
					const rightB = existing.x + existing.width;
					const topB = existing.y;
					const bottomB = existing.y + existing.width;

					return (
						leftA < rightB &&
						rightA > leftB &&
						topA < bottomB &&
						bottomA > topB
					);
				});

				if (!overlaps) {
					polygons.push({ x, y, width: widthPercentage });
					placed = true;
					break;
				}
			}
			if (!placed && import.meta.env.DEV) {
				console.warn(`Skipped polygon ${k} after ${attempts} attempts`);
			}
		}
		setPolygons(polygons);
	}, [total, randomWidthPercentage, margin]);

	if (!polygons.length) return null;

	return (
		<div className='absolute -top-1/5 -bottom-1/5 -left-1/5 -right-1/5 pointer-events-none z-1 mix-blend-difference'>
			{polygons.map((polygon, k) => (
				<Floating
					key={k}
					mode={mode}
					ratioX={ratio}
					ratioY={ratio}
					className='absolute'
					style={{
						left: `${polygon.x}%`,
						top: `${polygon.y}%`,
						width: `${polygon.width}%`,
					}}>
					<Polygon
						stroke='var(--color-palette-gray)'
						strokeWidth={2}
					/>
				</Floating>
			))}
		</div>
	);
};
export default Polygons;
