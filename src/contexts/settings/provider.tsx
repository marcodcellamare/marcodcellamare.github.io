import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { SettingsContext } from './context';

import { useTranslation } from 'react-i18next';
import { useRouter } from '../router';

import config from '!config';

import { PageIdType, TemplateType, ThemeType } from '!/types/config.const';

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const [overPageId, setOverPageId] = useState<PageIdType | null>(null);
	const [isNavOpened, setIsNavOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoaderTickled, setIsLoaderTickled] = useState(false);

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const setScrollContainerRef = (node: HTMLDivElement | null) =>
		(scrollContainerRef.current = node);

	const pageTheme = useMemo<ThemeType>(
		() => t('theme', config.themes.default) as ThemeType,
		[t]
	);

	const overTheme = useMemo<ThemeType | null>(
		() =>
			(i18n.exists(`${overPageId}:theme`)
				? t(`${overPageId}:theme`)
				: null) as ThemeType | null,
		[i18n, t, overPageId]
	);

	const sectionTheme = useCallback(
		(sectionId: number): ThemeType =>
			t(`sections.${sectionId}.theme`, pageTheme) as ThemeType,
		[t, pageTheme]
	);

	const sectionTemplate = useCallback(
		(sectionId: number): TemplateType =>
			t(
				`sections.${sectionId}.template`,
				config.templates.default
			) as TemplateType,
		[t]
	);

	const memoizedSetIsNavOpened = useCallback(setIsNavOpened, [
		setIsNavOpened,
	]);
	const memoizedSetOverPageId = useCallback(setOverPageId, [setOverPageId]);
	const memoizedSetIsLoading = useCallback(setIsLoading, [setIsLoading]);
	const memoizedSetIsLoaderTickled = useCallback(setIsLoaderTickled, [
		setIsLoaderTickled,
	]);

	return (
		<SettingsContext.Provider
			value={{
				scrollContainerRef,
				overPageId,
				isNavOpened,
				pageTheme,
				overTheme,
				isLoading,
				isLoaderTickled,

				sectionTheme,
				sectionTemplate,

				setScrollContainerRef,
				setOverPageId: memoizedSetOverPageId,
				setIsNavOpened: memoizedSetIsNavOpened,
				setIsLoading: memoizedSetIsLoading,
				setIsLoaderTickled: memoizedSetIsLoaderTickled,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
