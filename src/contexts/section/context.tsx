import { createContext, RefObject } from 'react';
import { TemplateType, ThemeType } from '!/types/config.const';

export interface SectionContextProps {
	sectionRef: RefObject<HTMLDivElement | null>;
	sectionId: number;
	template: TemplateType;
	theme: ThemeType;

	setSectionRef: (node: HTMLDivElement | null) => void;
}

export const SectionContext = createContext<SectionContextProps | undefined>(
	undefined
);
