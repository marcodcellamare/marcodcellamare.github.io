import { createContext, RefObject } from 'react';

import { TemplateType, ThemeType } from '!/types/config.const';
import { SettingsInterface } from '!/types/layout';

export interface SectionContextProps {
	sectionRef: RefObject<HTMLElement | null>;
	sectionId: number;
	template: TemplateType;
	settings: SettingsInterface;
	theme: ThemeType;
	nextBackgroundColor: string;
	duotoneColorBackground: string;
	duotoneColorForeground: string;
	hasImage: boolean;

	getTheme: (sectionId: number) => ThemeType;
	getTemplate: (sectionId: number) => TemplateType;

	setSectionRef: (node: HTMLElement | null) => void;
}

export const SectionContext = createContext<SectionContextProps | undefined>(
	undefined
);
