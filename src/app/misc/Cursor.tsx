import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useIsTouch from '!/hooks/useIsTouch';
import { useSettings } from '!/contexts/settings';

const Cursor = () => {
	const isTouch = useIsTouch();
	const { setIsLoaderTickled } = useSettings();

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping: 50, stiffness: 700 };
	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);

	const [links, setLinks] = useState<NodeListOf<Element>>();
	const [isInsideWindow, setIsInsideWindow] = useState(false);
	const [isHoveringLink, setIsHoveringLink] = useState(false);

	useEffect(() => {
		if (isTouch) return;

		const updateLinks = () =>
			setLinks(document.querySelectorAll('a, button'));

		updateLinks();

		const observer = new MutationObserver(updateLinks);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, [isTouch]);

	useEffect(() => {
		if (isTouch || !links) return;

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
	}, [links, x, y, isTouch]);

	useEffect(
		() => setIsLoaderTickled(isHoveringLink),
		[isHoveringLink, setIsLoaderTickled]
	);

	if (isTouch) return null;

	return (
		<motion.div
			className='cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference'
			style={{
				translateX: springX,
				translateY: springY,
			}}>
			<motion.div
				className='w-6 aspect-square rounded-full bg-[var(--color-palette-gray)] -translate-1/2'
				animate={{
					scale: isInsideWindow ? (isHoveringLink ? 4 : 1) : 0,
					opacity: isInsideWindow ? 1 : 0,
				}}
			/>
		</motion.div>
	);
};

export default Cursor;
