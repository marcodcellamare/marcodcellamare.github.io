import { createContext } from 'react';

export interface ScrollContextProps {
	scrollX: number;
	scrollY: number;
	isWheeling: boolean;
	isScrolling: boolean;

	subscribe: (callback: () => void) => () => void;
}

export const ScrollContext = createContext<ScrollContextProps | undefined>(
	undefined
);
