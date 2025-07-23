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
	const [isWheeling, setIsWheeling] = useState(false);
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

	const handleWheelDebounced = useDebounceCallback(
		() => setIsWheeling(false),
		10
	);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			setScrollX(container.scrollLeft);
			setScrollY(container.scrollTop);
			setIsScrolling(true);
			handleScrollDebounced();
		};
		const handleWheel = () => {
			setIsWheeling(true);
			handleWheelDebounced();
		};

		container.addEventListener('scroll', handleScroll, { passive: true });
		container.addEventListener('wheel', handleWheel, { passive: true });

		return () => {
			container.removeEventListener('scroll', handleScroll);
			container.removeEventListener('wheel', handleWheel);
		};
	}, [scrollContainerRef, handleScrollDebounced, handleWheelDebounced]);

	return (
		<ScrollContext.Provider
			value={{
				scrollX,
				scrollY,
				isWheeling,
				isScrolling,

				subscribe,
			}}>
			{children}
		</ScrollContext.Provider>
	);
};
