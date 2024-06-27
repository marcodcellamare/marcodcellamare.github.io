import React, { useEffect, useRef, useState } from 'react';
import { useMousePosition, useWindowSize } from '@/hooks';
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
	const windowSize = useWindowSize();
	const mousePosition = useMousePosition();
	const [position, setPosition] = useState<PointInterface>({ x: 0, y: 0 });
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Making it working only when visible

		if (
			ref.current.getBoundingClientRect().top +
				ref.current.getBoundingClientRect().height >
				0 &&
			ref.current.getBoundingClientRect().top < windowSize.h
		) {
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
	}, [windowSize, mousePosition, ratio]);

	return (
		<div
			ref={ref}
			className={`floating ${className}`.trim()}>
			{React.Children.map(children, (child) => {
				// Appending the transform styles to the children

				return React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement, {
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
