import { ReactNode, useCallback, useEffect } from 'react';
import { SettingsContext } from './context';
import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from 'react-i18next';

import config from '@config';

import { TemplateType, ThemeType } from '@/types/config.const';

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const overPageId = useUIStore((state) => state.overPageId);
	const activeSectionId = useUIStore((state) => state.activeSectionId);
	const pageTheme = useUIStore((state) => state.pageTheme);

	const setPageTheme = useUIStore((state) => state.setPageTheme);
	const setOverPageTheme = useUIStore((state) => state.setOverPageTheme);
	const setActiveSectionTheme = useUIStore(
		(state) => state.setActiveSectionTheme
	);

	const setPointerPosition = useUIStore((state) => state.setPointerPosition);
	const { i18n, t } = useTranslation(pageId);

	const getTheme = useCallback(
		(sectionId: number): ThemeType =>
			t(`sections.${sectionId}.theme`, {
				ns: pageId,
				defaultValue: pageTheme,
			}) as ThemeType,
		[t, pageId, pageTheme]
	);

	const getTemplate = useCallback(
		(sectionId: number): TemplateType =>
			t(`sections.${sectionId}.template`, {
				ns: pageId,
				defaultValue: config.templates.default,
			}) as TemplateType,
		[pageId, t]
	);

	useEffect(
		() => setPageTheme(t('theme', config.themes.default) as ThemeType),
		[t, setPageTheme]
	);

	useEffect(
		() =>
			setOverPageTheme(
				i18n.exists(`${overPageId}:theme`)
					? (t('theme', {
							ns: overPageId ?? '',
							defaultValue: config.themes.default,
					  }) as ThemeType)
					: null
			),
		[i18n, overPageId, setOverPageTheme, t]
	);

	useEffect(
		() => setActiveSectionTheme(getTheme(activeSectionId)),
		[activeSectionId, getTheme, setActiveSectionTheme]
	);

	useEffect(() => {
		let frameId: number | null = null;

		const handlePointerMove = (e: MouseEvent) => {
			if (frameId) return;
			frameId = requestAnimationFrame(() => {
				setPointerPosition({ x: e.clientX, y: e.clientY });
				frameId = null;
			});
		};

		window.addEventListener('pointermove', handlePointerMove);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			if (frameId) cancelAnimationFrame(frameId);
		};
	}, [setPointerPosition]);

	return (
		<SettingsContext.Provider
			value={{
				getTheme,
				getTemplate,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
