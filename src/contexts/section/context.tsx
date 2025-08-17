import { createContext, RefObject } from 'react';

import { TemplateType, ThemeType } from '@/types/config.const';
import { BackgroundInterface, SettingsInterface } from '@/types/layout';

export interface SectionContextProps {
	sectionRef: RefObject<HTMLElement | null>;
	sectionFullRef: RefObject<HTMLElement | null>;
	sectionId: number;
	template: TemplateType;
	background: Partial<BackgroundInterface>;
	settings: Partial<SettingsInterface>;
	theme: ThemeType;
	nextBackgroundColor: string;
	duotoneColorBackground: string;
	duotoneColorForeground: string;
	hasImage: boolean;

	setSectionRef: (node: HTMLElement | null) => void;
	setSectionFullRef: (node: HTMLElement | null) => void;
}

export const SectionContext = createContext<SectionContextProps | undefined>(
	undefined
);
