import { createContext } from 'react';

export interface ResizeContextProps {
	width: number;
	height: number;

	subscribe: (callback: () => void) => () => void;
}

export const ResizeContext = createContext<ResizeContextProps | undefined>(
	undefined
);
