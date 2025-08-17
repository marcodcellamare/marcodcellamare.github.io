import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

interface PolygonProps {
	sides?: number;
	maxSides?: number;
	fill?: string;
	fillOpacity?: number;
	stroke?: string;
	strokeOpacity?: number;
	strokeWidth?: number;
	strokeDasharray?: string;
	className?: string;
}

const Polygon = ({
	sides = 0,
	maxSides = 5,
	fill = 'none',
	fillOpacity = 1,
	stroke = 'none',
	strokeOpacity = 1,
	strokeWidth = 0,
	strokeDasharray,
	className,
}: PolygonProps) => {
	const size = useRef(100);
	const [actualSides, setActualSides] = useState(0);

	const points: [number, number][] = useMemo(() => {
		if (actualSides < 3) return [];

		const radius = size.current / 2;
		const center = radius;

		// Generate random angles, enforcing some spacing
		const angles: number[] = [];
		while (angles.length < actualSides) {
			const a = Math.random() * Math.PI * 2;
			if (
				angles.every(
					(existing) =>
						Math.abs(existing - a) > (Math.PI / actualSides) * 0.5
				)
			) {
				angles.push(a);
			}
		}

		// Sort them so polygon doesn't cross over
		angles.sort((a, b) => a - b);

		return angles.map((angle) => {
			// jitter radius to make it more irregular
			const r = radius * (0.5 + Math.random() * 0.5);
			const x = center + r * Math.cos(angle);
			const y = center + r * Math.sin(angle);
			return [x, y];
		});
	}, [actualSides]);

	const pointsString = useMemo(
		() => points.map(([x, y]) => `${x},${y}`).join(' '),
		[points]
	);

	useEffect(() => {
		setActualSides(
			sides < 3 ? Math.floor(Math.random() * (maxSides - 2) + 3) : sides
		);
	}, [sides, maxSides]);

	return (
		<svg
			viewBox={`0 0 ${size.current} ${size.current}`}
			preserveAspectRatio='xMidYMid meet'
			className={classNames(['polygon aspect-square', className])}>
			<polygon
				points={pointsString}
				fill={fill}
				fillOpacity={fillOpacity}
				stroke={stroke}
				strokeOpacity={strokeOpacity}
				strokeWidth={strokeWidth}
				strokeDasharray={strokeDasharray}
				strokeLinejoin='round'
				strokeLinecap='round'
				vectorEffect='non-scaling-stroke'
			/>
		</svg>
	);
};
export default Polygon;
