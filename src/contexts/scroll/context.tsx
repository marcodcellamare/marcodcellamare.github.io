import { createContext } from 'react';

export interface ScrollContextProps {
	scrollX: number;
	scrollY: number;
	isWheeling: number | false;
	isScrolling: boolean;

	subscribe: (callback: () => void) => () => void;
}

export const ScrollContext = createContext<ScrollContextProps | undefined>(
	undefined
);
