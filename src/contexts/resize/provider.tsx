import { ReactNode, useEffect, useRef, useState } from 'react';
import { ResizeContext } from './context';

import { windowSize } from '!/utils/misc';

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

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			setWidth(windowSize.width());
			setHeight(windowSize.height());

			listeners.current.forEach((callback) => callback());
		});

		observer.observe(document.documentElement);

		return () => observer.disconnect();
	}, []);

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
