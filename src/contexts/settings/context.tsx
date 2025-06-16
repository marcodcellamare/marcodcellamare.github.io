import { createContext, RefObject } from 'react';
import { PageIdType, TemplateType, ThemeType } from '!/types/config.const';

export interface SettingsContextProps {
	scrollContainerRef: RefObject<HTMLDivElement | null>;
	spaceRef: RefObject<Record<string, string>>;
	overPageId: PageIdType | null;
	isNavOpened: boolean;
	pageTheme: ThemeType;
	overTheme: ThemeType | null;
	isLoading: boolean;
	isLoaderTickled: boolean;

	sectionTheme: (sectionId: number) => ThemeType;
	sectionTemplate: (sectionId: number) => TemplateType;

	setScrollContainerRef: (node: HTMLDivElement | null) => void;
	setOverPageId: (pageId: PageIdType | null) => void;
	setIsNavOpened: (isOpened: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoaderTickled: (isLoaderTickled: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
	undefined
);
