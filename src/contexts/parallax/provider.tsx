import { ReactNode, RefObject, useRef } from 'react';
import { ParallaxContext } from './context';

interface ParallaxProviderProps {
	children: ReactNode;
}

export const ParallaxProvider = ({ children }: ParallaxProviderProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const getScrollConfig = (targetRef?: RefObject<HTMLElement | null>) => ({
		container: scrollContainerRef,
		target: targetRef,
		offset: ['start end', 'end start'] as ('start end' | 'end start')[],
		layoutEffect: false,
	});

	return (
		<ParallaxContext.Provider
			value={{
				scrollContainerRef,
				getScrollConfig,
			}}>
			{children}
		</ParallaxContext.Provider>
	);
};
