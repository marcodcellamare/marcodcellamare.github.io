import { createContext, RefObject } from 'react';
import { TemplateType, ThemeType } from '!/types/config.const';

export interface SectionContextProps {
	sectionId: number;
	template: TemplateType;
	theme: ThemeType;
	targetRef: RefObject<HTMLDivElement | null>;
	setTargetRef: (node: HTMLDivElement | null) => void;
}

export const SectionContext = createContext<SectionContextProps | undefined>(
	undefined
);
