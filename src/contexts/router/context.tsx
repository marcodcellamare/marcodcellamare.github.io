import { createContext } from 'react';
import { RouterContextProps } from '!/types/router';

export const RouterContext = createContext<RouterContextProps | undefined>(
	undefined
);
