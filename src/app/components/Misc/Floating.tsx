import React, { useEffect, useRef, useState } from 'react';
import { useIntersecting, useMousePosition } from '@/hooks';
import { Point as PointInterface } from '@interfaces/math';

const Floating = ({
	children,
	className,
	ratio = { x: 0, y: 0 },
}: {
	children: React.ReactNode;
	className?: string;
	ratio?: PointInterface;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const isIntersecting = useIntersecting(ref);
	const mousePosition = useMousePosition();
	const [position, setPosition] = useState<PointInterface>({ x: 0, y: 0 });

	useEffect(() => {
		// Making it working only when visible

		if (isIntersecting) {
			// Calculating the new position

			setPosition({
				x:
					ratio.x !== 0
						? Math.round(
								(ref.current.getBoundingClientRect().left +
									ref.current.getBoundingClientRect().width /
										2 -
									mousePosition.x) /
									ratio.x
						  )
						: 0,
				y:
					ratio.y !== 0
						? Math.round(
								(ref.current.getBoundingClientRect().top +
									ref.current.getBoundingClientRect().height /
										2 -
									mousePosition.y) /
									ratio.y
						  )
						: 0,
			});
		}
	}, [isIntersecting, mousePosition, ratio]);

	return (
		<div
			className={`floating${
				isIntersecting ? ' visible' : ''
			} ${className}`.trim()}>
			{React.Children.map(children, (child) => {
				// Appending the transform styles to the children

				return React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement, {
							ref: ref,
							style: {
								transform: (
									(position.x
										? `translateX(${position.x}px) `
										: '') +
									(position.y
										? `translateY(${position.y}px) `
										: '')
								).trim(),
							},
					  })
					: child;
			})}
		</div>
	);
};
export default Floating;
