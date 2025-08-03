import { createContext } from 'react';

import { TemplateType, ThemeType } from '@/types/config.const';

export interface SettingsContextProps {
	getTheme: (sectionId: number) => ThemeType;
	getTemplate: (sectionId: number) => TemplateType;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
	undefined
);
