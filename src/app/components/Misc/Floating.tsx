import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntersecting, useMousePosition, useResizing } from '@hooks';
import { Point as PointInterface } from '@interfaces/math';

const Floating = ({
	children,
	className = '',
	ratio = { x: 0, y: 0 },
	perspective,
	shadow = false,
}: {
	children: React.ReactNode;
	className?: string;
	ratio?: PointInterface;
	perspective?: number;
	shadow?: boolean | 'svg';
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const isIntersecting = useIntersecting(ref);
	const mousePosition = useMousePosition();
	const { w, h } = useResizing();
	const [position, setPosition] = useState<PointInterface>({ x: 0, y: 0 });
	const [distance, setDistance] = useState<number>(0);
	const [maxDistance, setMaxDistance] = useState<number>(0);
	const [perspectiveTransform, setPerspectiveTransform] =
		useState<PointInterface>({
			x: 0,
			y: 0,
		});
	const [perspectiveShadow, setPerspectiveShadow] = useState<PointInterface>({
		x: 0,
		y: 0,
	});

	const normalizeTo = useCallback(
		(to: number, float: number = 0) => {
			return (
				Math.round(((distance * to) / maxDistance) * 10 ** float) /
				10 ** float
			);
		},
		[distance, maxDistance]
	);

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

			// Calculating the distance

			setDistance(
				Math.sqrt(
					Math.pow(
						mousePosition.x -
							(ref.current.getBoundingClientRect().left +
								ref.current.getBoundingClientRect().width / 2),
						2
					) +
						Math.pow(
							mousePosition.y -
								(ref.current.getBoundingClientRect().top +
									ref.current.getBoundingClientRect().height /
										2),
							2
						)
				)
			);

			//

			if (perspective) {
				setPerspectiveTransform({
					x:
						(mousePosition.x -
							ref.current.getBoundingClientRect().left -
							ref.current.getBoundingClientRect().width / 2) /
						ratio.x,

					y:
						-(
							mousePosition.y -
							ref.current.getBoundingClientRect().top -
							ref.current.getBoundingClientRect().height / 2
						) / ratio.y,
				});
				if (shadow) {
					setPerspectiveShadow({
						x:
							-(
								mousePosition.x -
								ref.current.getBoundingClientRect().left -
								ref.current.getBoundingClientRect().width / 2
							) /
							(ratio.x / 2),

						y:
							-(
								mousePosition.y -
								ref.current.getBoundingClientRect().top -
								ref.current.getBoundingClientRect().height / 2
							) /
							(ratio.y / 2),
					});
				}
			}
		}
	}, [isIntersecting, mousePosition, ratio, perspective, shadow]);

	useEffect(() => {
		setMaxDistance(w > h ? w : h);
	}, [w, h]);

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
										: '') +
									(perspective
										? `perspective(${perspective}px) ` +
										  `rotateX(${perspectiveTransform.y}deg) ` +
										  `rotateY(${perspectiveTransform.x}deg) `
										: '')
								).trim(),
								boxShadow:
									perspective && shadow === true
										? `${perspectiveShadow.x}px ${
												perspectiveShadow.y
										  }px ${normalizeTo(
												5
										  )}px rgba(0, 0, 0, ${normalizeTo(
												0.3,
												2
										  )})`
										: null,
								filter:
									perspective && shadow === 'svg'
										? `drop-shadow(${
												perspectiveShadow.x
										  }px ${
												perspectiveShadow.y
										  }px ${normalizeTo(
												5
										  )}px rgba(0, 0, 0, ${normalizeTo(
												0.3,
												2
										  )}))`
										: null,
							},
					  })
					: child;
			})}
		</div>
	);
};
export default Floating;
