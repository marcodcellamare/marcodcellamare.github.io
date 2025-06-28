import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSection } from '!/contexts/section';
import { colorToRgb } from '!/utils/colors';
import { random } from '!/utils/math';

import Floating, { FloatingModeType } from '!/app/misc/Floating';
import Polygon from '!/app/misc/Polygon';

interface PolygonsProps {
	mode?: FloatingModeType;
	ratio?: number;
	min?: number;
	max?: number;
	minSize?: number;
	maxSize?: number;
}

const Polygons = ({
	mode = 'attract',
	ratio = 20,
	min = 1,
	max = 3,
	minSize = 50,
	maxSize = 70,
}: PolygonsProps) => {
	const { nextBackgroundColor } = useSection();

	const [polygons, setPolygons] = useState<
		{
			x: number;
			y: number;
			width: number;
		}[]
	>([]);

	const total = useMemo(() => Math.floor(random({ min, max })), [min, max]);

	const size = useCallback(() => {
		const supposedSize = 100 / total;
		const randomSize = random({
			min: Math.min(minSize, supposedSize),
			max: Math.min(maxSize, supposedSize),
		});
		return Math.round(randomSize * 100) / 100;
	}, [total, minSize, maxSize]);

	useEffect(() => {
		if (!total) return;

		const polygons = [];

		for (let k = 0; k < total; k++) {
			const width = size();

			polygons[k] = {
				x: Math.round(random({ min: 0, max: 100 - width }) * 100) / 100,
				y: Math.round(random({ min: 0, max: 100 - width }) * 100) / 100,
				width,
			};
		}
		setPolygons(polygons);
	}, [total, size]);

	if (!polygons.length) return null;

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 pointer-events-none perspective-midrange z-1'>
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
						fill={`rgba(${colorToRgb(nextBackgroundColor)}, 0.8)`}
					/>
				</Floating>
			))}
		</div>
	);
};
export default Polygons;
