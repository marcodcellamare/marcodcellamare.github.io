import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useIsTouch from '!/hooks/useIsTouch';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

type StatusType = 'relaxed' | 'nav' | 'link' | 'image' | 'out';

const Cursor = () => {
	const isTouch = useIsTouch();
	const { setIsLoaderTickled } = useSettings();

	const [damping, setDamping] = useState(50);
	const [stiffness, setStiffness] = useState(500);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping, stiffness };
	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);

	const [elements, setElements] = useState<NodeListOf<Element>>();
	const [status, setStatus] = useState<StatusType>('relaxed');
	const [cursorStyles, setCursorStyles] = useState({
		width: 0,
		height: 0,
		borderRadius: 0,
	});

	const pointerRelaxedHandler = () => {
		setCursorStyles({
			width: 5,
			height: 5,
			borderRadius: 50,
		});
		setDamping(50);
		setStiffness(500);
		setStatus('relaxed');
	};
	const pointerLeaveHandler = () => {
		setCursorStyles({
			width: 0,
			height: 0,
			borderRadius: 0,
		});
		setStatus('out');
	};

	const pointerStressedHandler = (e: Event) => {
		const element = e.currentTarget as HTMLElement;

		const isNav = element.closest('header') !== null;
		const isApp = element.closest('.app') !== null;
		const isImage = element.closest('.image') !== null;

		const status = isApp
			? !isImage
				? 'link'
				: 'image'
			: isNav
			? 'nav'
			: 'out';

		const rect = element.getBoundingClientRect();

		setCursorStyles({
			width:
				status === 'image'
					? (rect.width < rect.height ? rect.width : rect.height) /
					  1.5
					: rect.width,
			height:
				status === 'image'
					? (rect.width < rect.height ? rect.width : rect.height) /
					  1.5
					: rect.height,
			borderRadius:
				status === 'image'
					? rect.width > rect.height
						? rect.width
						: rect.height
					: 5,
		});
		setDamping(10);
		setStiffness(1000);
		setStatus(status);
	};

	useEffect(() => {
		if (isTouch) return;

		const updateElements = () =>
			setElements(document.querySelectorAll('a, button, .app .image'));

		updateElements();

		const observer = new MutationObserver(updateElements);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, [isTouch]);

	useEffect(() => {
		if (isTouch || !elements) return;

		const pointerMoveHandler = (e: MouseEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};

		window.addEventListener('pointermove', pointerMoveHandler);
		document.addEventListener('pointerenter', pointerRelaxedHandler);
		document.addEventListener('pointerleave', pointerLeaveHandler);

		elements?.forEach((element) => {
			element.addEventListener('pointerenter', pointerStressedHandler);
			element.addEventListener('pointerleave', pointerRelaxedHandler);
		});

		return () => {
			window.removeEventListener('pointermove', pointerMoveHandler);
			document.removeEventListener('pointerenter', pointerRelaxedHandler);
			document.removeEventListener('pointerleave', pointerLeaveHandler);

			elements?.forEach((element) => {
				element.removeEventListener(
					'pointerenter',
					pointerStressedHandler
				);
				element.removeEventListener(
					'pointerleave',
					pointerRelaxedHandler
				);
			});
		};
	}, [elements, x, y, isTouch]);

	useEffect(pointerRelaxedHandler, []);

	useEffect(
		() => setIsLoaderTickled(['link', 'nav'].includes(status)),
		[status, setIsLoaderTickled]
	);

	if (isTouch) return null;

	return (
		<motion.div
			className={classNames([
				'cursor fixed top-0 left-0 box-content pointer-events-none z-[9999] border-[var(--color-palette-gray)] mix-blend-difference -translate-1/2',
				'transition-[background-color,border-width] duration-300 ease-in-out',
				status !== 'image'
					? 'bg-[var(--color-palette-gray)]'
					: 'bg-[var(--color-palette-gray)]/0',
				status !== 'out' ? 'border-10' : 'border-0',
			])}
			animate={{
				opacity: status !== 'out' ? 1 : 0,
				width: cursorStyles.width,
				height: cursorStyles.height,
				borderRadius: cursorStyles.borderRadius,
			}}
			style={{
				translateX: springX,
				translateY: springY,
			}}
		/>
	);
};

export default Cursor;
