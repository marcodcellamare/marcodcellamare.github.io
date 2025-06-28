import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

interface PolygonProps {
	sides?: number;
	maxSides?: number;
	fill?: string;
	className?: string;
}

const getRandomPoint = (size: number): [number, number] => {
	const padding = size * 0.1; // Avoid points being too close to edges
	const x = padding + Math.random() * (size - 2 * padding);
	const y = padding + Math.random() * (size - 2 * padding);
	return [x, y];
};

const Polygon = ({
	sides = 0,
	maxSides = 8,
	fill = '#00FF00',
	className = '',
}: PolygonProps) => {
	const size = useRef(100);

	const [actualSides, setActualSides] = useState(0);

	// Generate random points
	const points: [number, number][] = useMemo(
		() =>
			Array.from({ length: actualSides }, () =>
				getRandomPoint(size.current)
			),
		[actualSides]
	);

	// Compute centroid
	const centroid: [number, number] = useMemo(
		() =>
			points.reduce(
				([cx, cy], [x, y]) => [
					cx + x / actualSides,
					cy + y / actualSides,
				],
				[0, 0]
			),
		[actualSides, points]
	);

	// Sort points by angle from centroid
	const sortedPoints = useMemo(
		() =>
			points.sort(([x1, y1], [x2, y2]) => {
				const angle1 = Math.atan2(y1 - centroid[1], x1 - centroid[0]);
				const angle2 = Math.atan2(y2 - centroid[1], x2 - centroid[0]);
				return angle1 - angle2;
			}),
		[centroid, points]
	);

	const pointsString = useMemo(
		() => sortedPoints.map(([x, y]) => `${x},${y}`).join(' '),
		[sortedPoints]
	);

	useEffect(
		() =>
			setActualSides(
				sides < 3 ? Math.floor(Math.random() * maxSides + 3) : sides
			),
		[sides, maxSides]
	);

	return (
		<svg
			viewBox={`0 0 ${size.current} ${size.current}`}
			preserveAspectRatio='xMidYMid meet'
			className={classNames(['polygon aspect-square', className])}>
			<polygon
				points={pointsString}
				fill={fill}
			/>
		</svg>
	);
};
export default Polygon;
