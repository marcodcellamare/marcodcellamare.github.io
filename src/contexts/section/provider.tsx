import { ReactNode, useRef } from 'react';
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
}: SectionProviderProps) => {
	const sectionRef = useRef<HTMLDivElement | null>(null);

	const setSectionRef = (node: HTMLDivElement | null) =>
		(sectionRef.current = node);

	return (
		<SectionContext.Provider
			value={{
				sectionRef,
				sectionId,
				template,
				theme,

				setSectionRef,
			}}>
			{children}
		</SectionContext.Provider>
	);
};
