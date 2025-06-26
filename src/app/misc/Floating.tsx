import { useEffect, useRef, ReactNode, useState } from 'react';
import {
	animate,
	motion,
	MotionStyle,
	useMotionValue,
	ValueAnimationTransition,
} from 'framer-motion';
import { useSettings } from '!/contexts/settings';
import useIntersecting from '!/hooks/useIntersecting';
import classNames from 'classnames';

export type FloatingModeType = 'attract' | 'repel';

interface FloatingProps {
	mode?: FloatingModeType;
	ratioX?: number;
	ratioY?: number;
	distanceMultiplier?: number;

	perspective?: number;
	shadow?: boolean | 'svg';

	className?: string;
	style?: MotionStyle;
	children: ReactNode;
}

const Floating = ({
	mode = 'attract',
	ratioX = 0,
	ratioY = 0,
	distanceMultiplier = 500,

	perspective,
	shadow = false,

	className = '',
	style = {},
	children,
}: FloatingProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const { pointerPosition } = useSettings();
	const isIntersecting = useIntersecting(ref);

	const [distance, setDistance] = useState(0);

	const motionX = useMotionValue(0);
	const motionY = useMotionValue(0);

	useEffect(() => {
		if (!isIntersecting || !ref.current) return;

		const animateProps: ValueAnimationTransition = {
			type: 'tween',
		};

		const direction: 1 | -1 = mode === 'attract' ? 1 : -1;
		const rect = ref.current.getBoundingClientRect();

		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const dx = pointerPosition.x - centerX;
		const dy = pointerPosition.y - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		const targetX =
			ratioX > 0
				? ((centerX - pointerPosition.x) /
						ratioX /
						(distance / (distanceMultiplier ?? 1))) *
				  direction
				: 0;
		const targetY =
			ratioY > 0
				? ((centerY - pointerPosition.y) /
						ratioY /
						(distance / (distanceMultiplier ?? 1))) *
				  direction
				: 0;

		animate(motionX, targetX, animateProps);
		animate(motionY, targetY, animateProps);
		setDistance(distance);
	}, [
		distanceMultiplier,
		isIntersecting,
		mode,
		motionX,
		motionY,
		pointerPosition.x,
		pointerPosition.y,
		ratioX,
		ratioY,
	]);

	return (
		<motion.div
			ref={ref}
			className={classNames(['floating', className])}
			style={{
				...style,
				x: motionX,
				y: motionY,
				//perspective: perspective ? `${perspective}px` : undefined,
			}}
			//style={{ x: springX, y: springY }}
			/*
			style={{
				x,
				y,
				rotateX: perspective ? rotateX : 0,
				rotateY: perspective ? rotateY : 0,
				transformPerspective: perspective
					? `${Math.max(100, perspective)}px`
					: undefined,
				boxShadow:
					perspective && shadow === true
						? `${shadowX.get()}px ${shadowY.get()}px 5px rgba(0,0,0,0.2)`
						: undefined,
				filter:
					perspective && shadow === 'svg'
						? `drop-shadow(${shadowX.get()}px ${shadowY.get()}px 5px rgba(0,0,0,0.2))`
						: undefined,
			}}
			*/
		>
			{children}
		</motion.div>
	);
};

export default Floating;
