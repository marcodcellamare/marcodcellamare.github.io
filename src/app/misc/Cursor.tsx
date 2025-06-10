import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useIsTouch from '!/hooks/useIsTouch';
import { useSettings } from '!/contexts/settings';

const Cursor: React.FC = () => {
	const isTouch = useIsTouch();
	const { setIsLoaderTickled } = useSettings();
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping: 50, stiffness: 700 };
	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);

	const [isInsideWindow, setIsInsideWindow] = useState(false);
	const [isHoveringLink, setIsHoveringLink] = useState(false);

	useEffect(() => {
		if (isTouch) return;

		const links = document.querySelectorAll('a, button');

		const mouseMoveHandler = (e: MouseEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
			setIsInsideWindow(true);
		};
		const mouseEnterHandler = () => setIsInsideWindow(true);
		const mouseLeaveHandler = () => setIsInsideWindow(false);
		const mouseEnterLinkHandler = () => setIsHoveringLink(true);
		const mouseLeaveLinkHandler = () => setIsHoveringLink(false);

		window.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseenter', mouseEnterHandler);
		document.addEventListener('mouseleave', mouseLeaveHandler);

		links.forEach((link) => {
			link.addEventListener('mouseenter', mouseEnterLinkHandler);
			link.addEventListener('mouseleave', mouseLeaveLinkHandler);
		});

		return () => {
			window.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseenter', mouseEnterHandler);
			document.removeEventListener('mouseleave', mouseLeaveHandler);

			links.forEach((link) => {
				link.removeEventListener('mouseenter', mouseEnterLinkHandler);
				link.removeEventListener('mouseleave', mouseLeaveLinkHandler);
			});
		};
	}, [x, y, isTouch]);

	useEffect(
		() => setIsLoaderTickled(isHoveringLink),
		[isHoveringLink, setIsLoaderTickled]
	);

	if (isTouch) return null;

	return (
		<motion.div
			className='fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference'
			style={{
				translateX: springX,
				translateY: springY,
			}}>
			<motion.div
				className='w-6 aspect-square rounded-full bg-base-200 -translate-1/2'
				animate={{
					scale: isInsideWindow ? (isHoveringLink ? 4 : 1) : 0,
					opacity: isInsideWindow ? 1 : 0,
				}}
			/>
		</motion.div>
	);
};

export default Cursor;
