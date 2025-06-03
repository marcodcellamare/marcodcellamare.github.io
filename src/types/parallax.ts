import { UseScrollOptions } from 'motion/react';
import { RefObject } from 'react';

export interface ParallaxContextProps {
	scrollContainerRef: RefObject<HTMLDivElement | null>;
	getScrollConfig: (
		targetRef?: RefObject<HTMLElement | null>
	) => UseScrollOptions;
}
