import { ReactNode, RefObject } from 'react';
import { ParallaxContext } from './context';
import { useSettings } from '../settings';

interface ParallaxProviderProps {
	children: ReactNode;
}

export const ParallaxProvider = ({ children }: ParallaxProviderProps) => {
	const { scrollContainerRef } = useSettings();

	const getScrollConfig = (targetRef?: RefObject<HTMLElement | null>) => ({
		container: scrollContainerRef,
		target: targetRef,
		offset: ['start end', 'end start'] as ('start end' | 'end start')[],
		layoutEffect: false,
	});

	return (
		<ParallaxContext.Provider
			value={{
				getScrollConfig,
			}}>
			{children}
		</ParallaxContext.Provider>
	);
};
