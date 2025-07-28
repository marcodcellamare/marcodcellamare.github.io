import { ReactNode, useEffect, useRef, useState } from 'react';
import { ResizeContext } from './context';

import useThrottleCallback from '@/hooks/useThrottleCallback';

import { windowSize } from '@/utils/misc';

interface ResizeProviderProps {
	children: ReactNode;
}

export const ResizeProvider = ({ children }: ResizeProviderProps) => {
	const [width, setWidth] = useState(windowSize.width());
	const [height, setHeight] = useState(windowSize.height());

	const listeners = useRef<Set<() => void>>(new Set());

	const subscribe = (callback: () => void) => {
		listeners.current.add(callback);

		return () => listeners.current.delete(callback);
	};

	const resizeObserverThrottled = useThrottleCallback(() => {
		setWidth(windowSize.width());
		setHeight(windowSize.height());

		listeners.current.forEach((callback) => callback());
	}, 500);

	useEffect(() => {
		const observer = new ResizeObserver(resizeObserverThrottled);

		const frameId = requestAnimationFrame(() => {
			observer.observe(document.documentElement);
		});

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frameId);
		};
	}, [resizeObserverThrottled]);

	useEffect(
		() => document.documentElement.style.setProperty('--dvw', `${width}px`),
		[width]
	);

	useEffect(
		() =>
			document.documentElement.style.setProperty('--dvh', `${height}px`),
		[height]
	);

	return (
		<ResizeContext.Provider
			value={{
				width,
				height,
				subscribe,
			}}>
			{children}
		</ResizeContext.Provider>
	);
};
