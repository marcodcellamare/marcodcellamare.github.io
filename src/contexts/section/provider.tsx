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
	const targetRef = useRef<HTMLDivElement | null>(null);

	const setTargetRef = (node: HTMLDivElement | null) => {
		targetRef.current = node;
	};

	return (
		<SectionContext.Provider
			value={{
				sectionId,
				template,
				theme,
				targetRef,
				setTargetRef,
			}}>
			{children}
		</SectionContext.Provider>
	);
};
