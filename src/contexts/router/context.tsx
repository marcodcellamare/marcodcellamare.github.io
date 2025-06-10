import { createContext } from 'react';
import { PageIdType } from '!/types/config.const';

export interface RouterContextProps {
	pageId: PageIdType;
}

export const RouterContext = createContext<RouterContextProps | undefined>(
	undefined
);
