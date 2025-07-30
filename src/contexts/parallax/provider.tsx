import { ReactNode, RefObject, useCallback } from 'react';
import { ParallaxContext } from './context';
import { useUIStore } from '@/stores/useUIStore';

interface ParallaxProviderProps {
	children: ReactNode;
}

export const ParallaxProvider = ({ children }: ParallaxProviderProps) => {
	const { isScrollContainerRefReady, scrollContainerRef } = useUIStore();

	const getScrollConfig = useCallback(
		(targetRef?: RefObject<HTMLElement | null>) =>
			isScrollContainerRefReady
				? {
						container: scrollContainerRef,
						target: targetRef,
						offset: ['start end', 'end start'] as (
							| 'start end'
							| 'end start'
						)[],
						layoutEffect: false,
				  }
				: {},
		[isScrollContainerRefReady, scrollContainerRef]
	);

	return (
		<ParallaxContext.Provider
			value={{
				getScrollConfig,
			}}>
			{children}
		</ParallaxContext.Provider>
	);
};
