import { ReactNode } from 'react';
import { SectionContext } from './context';

import { TemplateType, ThemeType } from '!/types/config.const';

interface SectionProviderProps {
	sectionId: number;
	template: TemplateType;
	theme: ThemeType;
	children: ReactNode;
}

export const SectionProvider = ({
	sectionId,
	template,
	theme,
	children,
}: SectionProviderProps) => (
	<SectionContext.Provider
		value={{
			sectionId,
			template,
			theme,
		}}>
		{children}
	</SectionContext.Provider>
);
