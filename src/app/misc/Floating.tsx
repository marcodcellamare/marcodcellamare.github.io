import { useRef, ReactNode, useEffect, useCallback } from 'react';
import {
	motion,
	animate as animateJs,
	MotionStyle,
	useAnimate,
	useInView,
	useMotionValue,
	ValueAnimationTransition,
	useMotionTemplate,
} from 'framer-motion';
import { useSettings } from '!/contexts/settings';
import { useResize } from '!/contexts/resize';
import classNames from 'classnames';
import useThrottleCallback from '!/hooks/useThrottleCallback';

export type FloatingModeType = 'attract' | 'repel';

interface FloatingProps {
	mode?: FloatingModeType;
	ratioX?: number;
	ratioY?: number;
	multiplier?: number;
	duration?: number;

	changePerspective?: boolean;
	maxRotation?: number;

	changeOpacity?: boolean;
	minOpacity?: number;
	maxOpacity?: number;

	changeShadow?: boolean;
	maxShadowBlur?: number;
	minShadowOpacity?: number;
	maxShadowOpacity?: number;

	className?: string;
	style?: MotionStyle;
	children: ReactNode;
}

const Floating = ({
	mode = 'attract',
	ratioX = 0,
	ratioY = 0,
	multiplier = 2,
	duration = 2,

	changePerspective = false,
	maxRotation = 45,

	changeOpacity = false,
	minOpacity = 0,
	maxOpacity = 1,

	changeShadow = false,
	maxShadowBlur = 30,
	minShadowOpacity = 0.05,
	maxShadowOpacity = 0.2,

	className = '',
	style = {},
	children,
}: FloatingProps) => {
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope);

	const direction = mode === 'attract' ? -1 : 1;

	const { pointerPosition } = useSettings();
	const { width, height } = useResize();

	const motionShadowX = useMotionValue(0);
	const motionShadowY = useMotionValue(0);
	const motionShadowBlur = useMotionValue(0);
	const motionShadowOpacity = useMotionValue(0);

	const shadowFilter = useMotionTemplate`drop-shadow(${motionShadowX}px ${motionShadowY}px ${motionShadowBlur}px rgba(0,0,0,${motionShadowOpacity}))`;

	const animateProps = useRef<ValueAnimationTransition>({
		type: 'tween',
		ease: 'easeOut',
		duration,
	});

	const update = useCallback(() => {
		if (!isInView || !scope.current || (!ratioX && !ratioY)) return;

		const rect = scope.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = pointerPosition.x - centerX;
		const dy = pointerPosition.y - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		const rectDistanceWidth = Math.max(centerX, width - centerX);
		const rectDistanceHeight = Math.max(centerY, height - centerY);
		const maxDistance = Math.max(rectDistanceWidth, rectDistanceHeight);
		const distancePercentage = maxDistance
			? Math.max(0, Math.min(1, distance / maxDistance))
			: 0;

		const transformX =
			ratioX > 0 && distance > 0
				? ((centerX - pointerPosition.x) / ratioX) *
				  ((1 - distancePercentage) * multiplier) *
				  direction
				: 0;
		const transformY =
			ratioY > 0 && distance > 0
				? ((centerY - pointerPosition.y) / ratioY) *
				  ((1 - distancePercentage) * multiplier) *
				  direction
				: 0;

		const opacity =
			changeOpacity &&
			distance > Math.min(rect.width / 3, rect.height / 3)
				? Math.floor(
						((1 - distancePercentage) * (maxOpacity - minOpacity) +
							minOpacity) *
							100
				  ) / 100
				: 1;

		const rotateX =
			changePerspective && ratioY > 0
				? (((centerY - pointerPosition.y) * maxRotation) /
						maxDistance) *
				  direction
				: 0;
		const rotateY =
			changePerspective && ratioX > 0
				? (((centerX - pointerPosition.x) * maxRotation) /
						maxDistance) *
				  -direction
				: 0;

		const shadowX =
			changePerspective && changeShadow
				? ((centerX - pointerPosition.x) / (ratioX / 2)) * direction
				: 0;
		const shadowY =
			changePerspective && changeShadow
				? ((centerY - pointerPosition.y) / (ratioY / 2)) * direction
				: 0;
		const shadowBlur =
			changePerspective && changeShadow
				? Math.floor(distancePercentage * maxShadowBlur)
				: 0;
		const shadowOpacity =
			changePerspective &&
			changeShadow &&
			distance > Math.min(rect.width / 3, rect.height / 3)
				? Math.floor(
						((1 - distancePercentage) *
							(maxShadowOpacity - minShadowOpacity) +
							minShadowOpacity) *
							100
				  ) / 100
				: 0;

		animateJs(motionShadowX, shadowX, animateProps.current);
		animateJs(motionShadowY, shadowY, animateProps.current);
		animateJs(motionShadowBlur, shadowBlur, animateProps.current);
		animateJs(motionShadowOpacity, shadowOpacity, animateProps.current);

		animate(
			scope.current,
			{ x: transformX, y: transformY, rotateX, rotateY, opacity },
			animateProps.current
		);
	}, [
		isInView,
		scope,
		ratioX,
		ratioY,
		pointerPosition.x,
		pointerPosition.y,
		width,
		height,
		multiplier,
		direction,
		changePerspective,
		maxRotation,
		maxShadowBlur,
		minShadowOpacity,
		maxShadowOpacity,
		changeOpacity,
		minOpacity,
		maxOpacity,
		changeShadow,
		motionShadowX,
		motionShadowY,
		motionShadowBlur,
		motionShadowOpacity,
		animate,
	]);

	const updateThrottled = useThrottleCallback(update, 30);

	useEffect(() => {
		updateThrottled();
	}, [updateThrottled, pointerPosition]);

	return (
		<motion.div
			ref={scope}
			className={classNames([
				'floating will-change-transform',
				className,
			])}
			style={{
				...style,
				filter:
					changeShadow && changePerspective
						? shadowFilter
						: undefined,
			}}>
			{children}
		</motion.div>
	);
};

export default Floating;
