import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { SectionContext } from './context';

import { useSettings } from '@/contexts/settings';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import { cssVariable } from '@/utils/misc';

import config from '@config';

import { TemplateType, ThemeType } from '@/types/config.const';
import {
	BackgroundInterface,
	ContentInterface,
	SettingsInterface,
} from '@/types/layout';

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

	const sectionRef = useRef<HTMLElement | null>(null);

	const setSectionRef = (node: HTMLElement | null) =>
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

	const settings = useTranslationFallback<Partial<SettingsInterface>>(
		`sections.${sectionId}.settings`,
		{},
		pageId
	);

	const background = useTranslationFallback<Partial<BackgroundInterface>>(
		`sections.${sectionId}.background`,
		{},
		pageId
	);

	const content = useTranslationFallback<Partial<ContentInterface[]>>(
		`sections.${sectionId}.content`,
		[],
		pageId
	);

	const hasImage = useMemo(
		() => content.some((item) => item && 'image' in item),
		[content]
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
				background,
				settings,
				theme,
				nextBackgroundColor,
				duotoneColorBackground,
				duotoneColorForeground,
				hasImage,

				getTheme,
				getTemplate,

				setSectionRef,
			}}>
			{children}
		</SectionContext.Provider>
	);
};
