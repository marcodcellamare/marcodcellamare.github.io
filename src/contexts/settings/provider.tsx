import { ReactNode, useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from 'react-i18next';

import config from '@config';

import { ThemeType } from '@/types/config.const';

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const overPageId = useUIStore((state) => state.overPageId);
	const activeSectionId = useUIStore((state) => state.activeSectionId);

	const setPageTheme = useUIStore((state) => state.setPageTheme);
	const setOverPageTheme = useUIStore((state) => state.setOverPageTheme);
	const setActiveSectionTheme = useUIStore(
		(state) => state.setActiveSectionTheme
	);

	const setPointerPosition = useUIStore((state) => state.setPointerPosition);
	const { i18n, t } = useTranslation(pageId);

	useEffect(
		() => setPageTheme(t('theme', config.themes.default) as ThemeType),
		[t, setPageTheme]
	);

	useEffect(
		() =>
			setOverPageTheme(
				i18n.exists(`${overPageId}:theme`)
					? (t(
							`${overPageId}:theme`,
							config.themes.default
					  ) as ThemeType)
					: null
			),
		[i18n, overPageId, setOverPageTheme, t]
	);

	useEffect(
		() =>
			setActiveSectionTheme(
				t(
					`${pageId}:sections.${activeSectionId}.theme`,
					config.themes.default
				) as ThemeType
			),
		[activeSectionId, pageId, setActiveSectionTheme, t]
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

	return children;
};
