import { createContext } from 'react';
import { TemplateType, ThemeType } from '!/types/config.const';

export interface SectionContextProps {
	sectionId: number;
	template: TemplateType;
	theme: ThemeType;
}

export const SectionContext = createContext<SectionContextProps | undefined>(
	undefined
);
