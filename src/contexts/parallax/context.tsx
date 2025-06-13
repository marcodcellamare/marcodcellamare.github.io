import { createContext, RefObject } from 'react';
import { UseScrollOptions } from 'motion/react';

export interface ParallaxContextProps {
	scrollContainerRef: RefObject<HTMLDivElement | null>;

	setScrollContainerRef: (node: HTMLDivElement | null) => void;
	getScrollConfig: (
		targetRef?: RefObject<HTMLElement | null>
	) => UseScrollOptions;
}

export const ParallaxContext = createContext<ParallaxContextProps | undefined>(
	undefined
);
