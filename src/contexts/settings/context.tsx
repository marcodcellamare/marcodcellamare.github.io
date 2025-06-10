import { createContext } from 'react';
import { PageIdType, TemplateType, ThemeType } from '!/types/config.const';

export interface SettingsContextProps {
	overPageId: PageIdType | null;
	isNavOpened: boolean;
	pageTheme: ThemeType;
	overTheme: ThemeType | null;
	isLoading: boolean;
	isLoaderTickled: boolean;

	sectionTheme: (sectionId: number) => ThemeType;
	sectionTemplate: (sectionId: number) => TemplateType;

	setOverPageId: (pageId: PageIdType | null) => void;
	setIsNavOpened: (isOpened: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoaderTickled: (isLoaderTickled: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
	undefined
);
