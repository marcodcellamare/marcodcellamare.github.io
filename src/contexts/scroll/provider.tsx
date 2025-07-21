import { ReactNode, useEffect, useRef, useState } from 'react';
import { ScrollContext } from './context';

import { useSettings } from '@/contexts/settings';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

interface ScrollProviderProps {
	children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
	const { scrollContainerRef } = useSettings();

	const [scrollX, setScrollX] = useState(0);
	const [scrollY, setScrollY] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);

	const listeners = useRef<Set<() => void>>(new Set());

	const subscribe = (callback: () => void) => {
		listeners.current.add(callback);
		return () => listeners.current.delete(callback);
	};

	const handleScrollDebounced = useDebounceCallback(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		setIsScrolling(false);
		listeners.current.forEach((callback) => callback());
	}, 100);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			setScrollX(container.scrollLeft);
			setScrollY(container.scrollTop);
			setIsScrolling(true);

			handleScrollDebounced();
		};

		container.addEventListener('scroll', handleScroll, { passive: true });
		return () => container.removeEventListener('scroll', handleScroll);
	}, [scrollContainerRef, handleScrollDebounced]);

	return (
		<ScrollContext.Provider
			value={{
				scrollX,
				scrollY,
				isScrolling,

				subscribe,
			}}>
			{children}
		</ScrollContext.Provider>
	);
};
