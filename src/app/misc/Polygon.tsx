import React from 'react';

interface RandomPolygonProps {
	size?: number; // Size of the SVG canvas
	sides?: number; // Number of polygon sides (vertices)
	fill?: string; // Fill color
	stroke?: string; // Stroke color
	strokeWidth?: number; // Stroke width
}

const getRandomPoint = (size: number): [number, number] => {
	const x = Math.random() * size;
	const y = Math.random() * size;
	return [x, y];
};

const RandomPolygon: React.FC<RandomPolygonProps> = ({
	size = 100,
	sides = 5,
	fill = 'transparent',
	stroke = 'black',
	strokeWidth = 2,
}) => {
	const actualSides = Math.max(3, sides); // Minimum 3 sides for a valid polygon

	const points: [number, number][] = Array.from({ length: actualSides }, () =>
		getRandomPoint(size)
	);

	const pointsString = points.map(([x, y]) => `${x},${y}`).join(' ');

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}>
			<polygon
				points={pointsString}
				fill={fill}
				stroke={stroke}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};

export default RandomPolygon;
