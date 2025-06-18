import { createContext, RefObject } from 'react';

import { TemplateType, ThemeType } from '!/types/config.const';

export interface SectionContextProps {
	sectionRef: RefObject<HTMLDivElement | null>;
	sectionId: number;
	template: TemplateType;
	theme: ThemeType;
	nextBackgroundColor: string;
	duotoneColorBackground: string;
	duotoneColorForeground: string;

	getTheme: (sectionId: number) => ThemeType;
	getTemplate: (sectionId: number) => TemplateType;

	setSectionRef: (node: HTMLDivElement | null) => void;
}

export const SectionContext = createContext<SectionContextProps | undefined>(
	undefined
);
