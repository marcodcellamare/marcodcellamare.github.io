import { useRef, useEffect } from 'react';
import { spline } from '@georgedoescode/spline';
import { createNoise2D } from 'simplex-noise';
import classNames from 'classnames';

type PointType = {
	x: number;
	y: number;
	originX: number;
	originY: number;
	noiseOffsetX: number;
	noiseOffsetY: number;
};

interface BlobProps {
	mask?: string | false;
	speed?: number;
	numPoints?: number;
	radius?: number;
	className?: string;
}

const createPoints = (numPoints = 5, radius = 80): PointType[] => {
	const points: PointType[] = [];
	const angleStep = (Math.PI * 2) / numPoints;

	for (let i = 1; i <= numPoints; i++) {
		const theta = i * angleStep;
		const x = 100 + Math.cos(theta) * radius;
		const y = 100 + Math.sin(theta) * radius;

		points.push({
			x,
			y,
			originX: x,
			originY: y,
			noiseOffsetX: Math.random() * 1000,
			noiseOffsetY: Math.random() * 1000,
		});
	}
	return points;
};

const Blob = ({
	mask = false,
	speed = 0.001,
	numPoints = 5,
	radius = 80,
	className = '',
}: BlobProps) => {
	const pathRef = useRef<SVGPathElement | null>(null);
	const simplex = useRef(createNoise2D());
	const points = useRef<PointType[]>(createPoints(numPoints, radius));
	const noiseStepRef = useRef<number>(speed);

	const noise = (x: number, y: number) => simplex.current(x, y);

	const map = (
		n: number,
		start1: number,
		end1: number,
		start2: number,
		end2: number
	) => ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;

	useEffect(() => {
		const animate = () => {
			const path = pathRef.current;
			if (!path) return;

			path.setAttribute('d', spline(points.current, 1, true));

			points.current.forEach((point) => {
				const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
				const nY = noise(point.noiseOffsetY, point.noiseOffsetY);

				point.x = map(
					nX,
					-1,
					1,
					point.originX - 20,
					point.originX + 20
				);
				point.y = map(
					nY,
					-1,
					1,
					point.originY - 20,
					point.originY + 20
				);
				point.noiseOffsetX += noiseStepRef.current;
				point.noiseOffsetY += noiseStepRef.current;
			});
			requestAnimationFrame(animate);
		};
		animate();
	}, []);

	useEffect(() => {
		noiseStepRef.current = speed;
	}, [speed]);

	useEffect(() => {
		points.current = createPoints(numPoints, radius);
	}, [numPoints, radius]);

	return (
		<svg
			className={classNames('blob block w-full h-full', className)}
			viewBox='0 0 200 200'
			preserveAspectRatio='xMidYMid meet'>
			{mask ? (
				<clipPath
					id={mask}
					clipPathUnits='objectBoundingBox'
					transform='scale(0.005)'>
					<path ref={pathRef} />
				</clipPath>
			) : (
				<path ref={pathRef} />
			)}
		</svg>
	);
};
export default Blob;
