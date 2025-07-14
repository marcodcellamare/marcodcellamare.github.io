import { createContext, JSX } from 'react';
import { BreakpointsProps } from './Breakpoints';

export interface DevUtilitiesContextProps {
	DevBreakpoints: (props?: BreakpointsProps) => JSX.Element;
}

export const DevUtilitiesContext = createContext<
	DevUtilitiesContextProps | undefined
>(undefined);
