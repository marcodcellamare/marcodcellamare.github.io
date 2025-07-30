import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useIsTouch from '@/hooks/useIsTouch';
import { useUIStore } from '@/stores/useUIStore';
import useThrottleCallback from '@/hooks/useThrottleCallback';
import classNames from 'classnames';

import { IntervalType } from '@/types/misc';

import '@/styles/components/misc/Cursor.css';

type StatusType = 'relaxed' | 'nav' | 'link' | 'image' | 'leave';

const Cursor = () => {
	const pointerPosition = useUIStore((state) => state.pointerPosition);
	const setIsLoaderTickled = useUIStore((state) => state.setIsLoaderTickled);
	const isTouch = useIsTouch();

	const [elements, setElements] = useState<NodeListOf<Element>>();
	const [status, setStatus] = useState<StatusType>('relaxed');
	const [cursorStyles, setCursorStyles] = useState({
		width: 0,
		height: 0,
		borderRadius: 0,
	});

	const [damping, setDamping] = useState(50);
	const [stiffness, setStiffness] = useState(500);

	const intervalRef = useRef<IntervalType>(null);

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const handlePointerRelaxed = useCallback(() => {
		cleanup();
		setCursorStyles({
			width: 5,
			height: 5,
			borderRadius: 50,
		});
		setDamping(100);
		setStiffness(2000);
		setStatus('relaxed');
	}, []);

	const handlePointerLeave = useCallback(() => {
		cleanup();
		setCursorStyles({
			width: 0,
			height: 0,
			borderRadius: 0,
		});
		setStatus('leave');
	}, []);

	const handlePointerStressed = useCallback((e: Event) => {
		cleanup();
		const element = e.currentTarget as HTMLElement;

		const update = () => {
			const isNav = element.closest('header') !== null;
			const isApp = element.closest('.app, footer') !== null;
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
						? Math.min(rect.width, rect.height) * 1.1
						: rect.width,
				height:
					status === 'image'
						? Math.min(rect.width, rect.height) * 1.1
						: rect.height,
				borderRadius:
					status === 'image' ? Math.max(rect.width, rect.height) : 5,
			});
			setDamping(25);
			setStiffness(1000);
			setStatus(status);
		};
		intervalRef.current = setInterval(update, 200);
		update();
	}, []);

	const mutationObserverThrottled = useThrottleCallback(() => {
		const elements = document.querySelectorAll('a, button, .app .image');
		setElements((prev) => {
			if (prev && prev.length === elements.length) return prev;
			return elements;
		});
	}, 100);

	useEffect(() => {
		if (isTouch) return;
		const observer = new MutationObserver(mutationObserverThrottled);

		const frameId = requestAnimationFrame(() => {
			mutationObserverThrottled();
			observer.observe(document.body, { childList: true, subtree: true });
		});

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frameId);
		};
	}, [isTouch, mutationObserverThrottled]);

	useEffect(() => {
		if (isTouch || !elements) return;

		document.addEventListener('pointerenter', handlePointerRelaxed);
		document.addEventListener('pointerleave', handlePointerLeave);

		elements?.forEach((element) => {
			element.addEventListener('pointerenter', handlePointerStressed);
			element.addEventListener('pointerleave', handlePointerRelaxed);
		});

		return () => {
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
	}, [
		elements,
		handlePointerLeave,
		handlePointerRelaxed,
		handlePointerStressed,
		isTouch,
	]);

	useEffect(handlePointerRelaxed, [handlePointerRelaxed]);

	useEffect(
		() => setIsLoaderTickled(['link', 'nav'].includes(status)),
		[status, setIsLoaderTickled]
	);

	useEffect(() => {
		return cleanup;
	}, []);

	if (isTouch) return null;

	return (
		<motion.div
			className={classNames([
				'cursor fixed top-0 left-0 -translate-1/2 p-2 box-content pointer-events-none z-99999 overflow-hidden',
				'border-(--color-palette-gray) mix-blend-difference',
				'transition-[background-color,border-width] duration-300 ease-in-out',
				['relaxed', 'leave'].includes(status)
					? 'bg-(--color-palette-gray)'
					: 'bg-(--color-palette-gray)/0',
				{
					'cursor-link border-[calc(var(--spacing)*2)]': [
						'nav',
						'link',
					].includes(status),
					'cursor-image border-[calc(var(--spacing)*2)]': [
						'image',
					].includes(status),
					'border-0': ['leave'].includes(status),
				},
			])}
			animate={{
				x: pointerPosition.x,
				y: pointerPosition.y,
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
