import { createContext, RefObject } from 'react';
import { ThemeType } from '@/types/config.const';

export interface SettingsContextProps {
	scrollContainerRef: RefObject<HTMLDivElement | null>;
	sectionRefs: RefObject<Record<number, HTMLElement | null>>;
	pageTheme: ThemeType;
	overTheme: ThemeType | null;
	activeSectionTheme: ThemeType;

	setScrollContainerRef: (node: HTMLDivElement | null) => void;
	setSectionRefs: (sectionId: number, node: HTMLElement | null) => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
	undefined
);
