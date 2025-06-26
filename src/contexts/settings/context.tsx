import { createContext, RefObject } from 'react';
import { PageIdType, ThemeType } from '!/types/config.const';

export interface SettingsContextProps {
	scrollContainerRef: RefObject<HTMLDivElement | null>;
	sectionRefs: RefObject<Record<number, HTMLElement | null>>;
	spaceRef: RefObject<Record<string, string>>;
	overPageId: PageIdType | null;
	isNavOpened: boolean;
	pageTheme: ThemeType;
	overTheme: ThemeType | null;
	isLoading: boolean;
	isLoaderTickled: boolean;
	activeSectionId: number;
	activeSectionTheme: ThemeType;
	pointerPosition: { x: number; y: number };

	setScrollContainerRef: (node: HTMLDivElement | null) => void;
	setSectionRefs: (sectionId: number, node: HTMLElement | null) => void;
	setOverPageId: (pageId: PageIdType | null) => void;
	setIsNavOpened: (isOpened: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoaderTickled: (isLoaderTickled: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
	undefined
);
