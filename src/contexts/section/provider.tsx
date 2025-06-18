import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { SectionContext } from './context';

import { useSettings } from '../settings';
import { useTranslation } from 'react-i18next';
import { useRouter } from '../router';
import { cssVariable } from '!/utils/misc';

import config from '!config';

import { TemplateType, ThemeType } from '!/types/config.const';

interface SectionProviderProps {
	sectionId: number;
	children: ReactNode;
}

export const SectionProvider = ({
	sectionId,
	children,
}: SectionProviderProps) => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { pageTheme } = useSettings();

	const [duotoneColorBackground, setDuotoneColorBackground] =
		useState<string>('#000');
	const [duotoneColorForeground, setDuotoneColorForeground] =
		useState<string>('#FFF');
	const [nextBackgroundColor, setNextBackgroundColor] = useState<
		string | '#FFF'
	>('#FFF');

	const sectionRef = useRef<HTMLDivElement | null>(null);

	const setSectionRef = (node: HTMLDivElement | null) =>
		(sectionRef.current = node);

	const getTheme = useCallback(
		(sectionId: number): ThemeType =>
			t(`sections.${sectionId}.theme`, pageTheme) as ThemeType,
		[t, pageTheme]
	);

	const getTemplate = useCallback(
		(sectionId: number): TemplateType =>
			t(
				`sections.${sectionId}.template`,
				config.templates.default
			) as TemplateType,
		[t]
	);

	const theme = useMemo(() => getTheme(sectionId), [getTheme, sectionId]);
	const template = useMemo(
		() => getTemplate(sectionId),
		[getTemplate, sectionId]
	);

	const themeCssVar = (theme: ThemeType, cssVar: string) =>
		cssVariable(cssVar, `[data-theme="${theme}"]`);

	useEffect(() => {
		setDuotoneColorBackground(
			themeCssVar(theme, '--duotone-color-background')
		);
		setDuotoneColorForeground(
			themeCssVar(theme, '--duotone-color-foreground')
		);
	}, [theme, sectionId]);

	useEffect(
		() =>
			setNextBackgroundColor(
				themeCssVar(getTheme(sectionId + 1), '--color-background')
			),
		[getTheme, sectionId]
	);

	return (
		<SectionContext.Provider
			value={{
				sectionRef,
				sectionId,
				template,
				theme,
				nextBackgroundColor,
				duotoneColorBackground,
				duotoneColorForeground,

				getTheme,
				getTemplate,

				setSectionRef,
			}}>
			{children}
		</SectionContext.Provider>
	);
};
