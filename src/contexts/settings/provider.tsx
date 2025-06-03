import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { SettingsContext } from './context';

import { useTranslation } from 'react-i18next';
import { useRouter } from '../router';

import { TemplateType, ThemeType } from '!/types/layout';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const [overPageId, setOverPageId] = useState<PageIdType | null>(null);
	const [isNavOpened, setIsNavOpened] = useState(false);

	const theme = useMemo<ThemeType>(
		() => t('theme', 'light-gray') as ThemeType,
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
			t(`sections.${sectionId}.theme`, theme) as ThemeType,
		[t, theme]
	);

	const sectionTemplate = useCallback(
		(sectionId: number): TemplateType =>
			t(`sections.${sectionId}.template`, 'full') as TemplateType,
		[t]
	);

	const memoizedSetIsNavOpened = useCallback(setIsNavOpened, [
		setIsNavOpened,
	]);
	const memoizedSetOverPageId = useCallback(setOverPageId, [setOverPageId]);

	return (
		<SettingsContext.Provider
			value={{
				overPageId,
				isNavOpened,
				theme,
				overTheme,

				sectionTheme,
				sectionTemplate,

				setOverPageId: memoizedSetOverPageId,
				setIsNavOpened: memoizedSetIsNavOpened,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
