import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useIsTouch from '!/hooks/useIsTouch';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import '!/styles/components/misc/Cursor.css';

type StatusType = 'relaxed' | 'nav' | 'link' | 'image' | 'leave';

const Cursor = () => {
	const isTouch = useIsTouch();
	const { setIsLoaderTickled } = useSettings();

	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [elements, setElements] = useState<NodeListOf<Element>>();
	const [status, setStatus] = useState<StatusType>('relaxed');
	const [cursorStyles, setCursorStyles] = useState({
		width: 0,
		height: 0,
		borderRadius: 0,
	});

	const [damping, setDamping] = useState(50);
	const [stiffness, setStiffness] = useState(500);

	const handlePointerRelaxed = () => {
		setCursorStyles({
			width: 5,
			height: 5,
			borderRadius: 50,
		});
		setDamping(50);
		setStiffness(500);
		setStatus('relaxed');
	};

	const handlePointerLeave = () => {
		setCursorStyles({
			width: 0,
			height: 0,
			borderRadius: 0,
		});
		setStatus('leave');
	};

	const handlePointerStressed = (e: Event) => {
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
			: 'leave';

		const rect = element.getBoundingClientRect();

		setCursorStyles({
			width:
				status === 'image'
					? (rect.width < rect.height ? rect.width : rect.height) *
					  1.1
					: rect.width,
			height:
				status === 'image'
					? (rect.width < rect.height ? rect.width : rect.height) *
					  1.1
					: rect.height,
			borderRadius:
				status === 'image'
					? rect.width > rect.height
						? rect.width
						: rect.height
					: 5,
		});
		setDamping(25);
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

		const handlePointerMove = (e: MouseEvent) => {
			setCursorPos({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('pointermove', handlePointerMove);
		document.addEventListener('pointerenter', handlePointerRelaxed);
		document.addEventListener('pointerleave', handlePointerLeave);

		elements?.forEach((element) => {
			element.addEventListener('pointerenter', handlePointerStressed);
			element.addEventListener('pointerleave', handlePointerRelaxed);
		});

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			document.removeEventListener('pointerenter', handlePointerRelaxed);
			document.removeEventListener('pointerleave', handlePointerLeave);

			elements?.forEach((element) => {
				element.removeEventListener(
					'pointerenter',
					handlePointerStressed
				);
				element.removeEventListener(
					'pointerleave',
					handlePointerRelaxed
				);
			});
		};
	}, [elements, isTouch]);

	useEffect(handlePointerRelaxed, []);

	useEffect(() => {
		setIsLoaderTickled(['link', 'nav'].includes(status));
	}, [status, setIsLoaderTickled]);

	if (isTouch) return null;

	return (
		<motion.div
			className={classNames([
				'cursor fixed top-0 left-0 -translate-1/2 p-2 box-content pointer-events-none z-[9999] border-[var(--color-palette-gray)] mix-blend-difference overflow-hidden',
				'transition-[background-color,border-width] duration-300 ease-in-out',
				['relaxed', 'leave'].includes(status)
					? 'bg-[var(--color-palette-gray)]'
					: 'bg-[var(--color-palette-gray)]/0',
				{
					'cursor-link border-5': ['nav', 'link'].includes(status),
					'cursor-image border-10': ['image'].includes(status),
					'border-0': ['leave'].includes(status),
				},
			])}
			animate={{
				x: cursorPos.x,
				y: cursorPos.y,
				opacity: status !== 'leave' ? 1 : 0,
				width: cursorStyles.width,
				height: cursorStyles.height,
				borderRadius: cursorStyles.borderRadius,
			}}
			transition={{
				x: { type: 'spring', damping, stiffness },
				y: { type: 'spring', damping, stiffness },
				width: { duration: 0.3 },
				height: { duration: 0.3 },
				borderRadius: { duration: 0.3 },
				opacity: { duration: 0.3 },
			}}
		/>
	);
};

export default Cursor;
