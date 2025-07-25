import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { SettingsContext } from './context';

import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRouter } from '@/contexts/router';

import config from '@config';

import { ThemeType } from '@/types/config.const';

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const activeSectionId = useUIStore((state) => state.activeSectionId);
	const overPageId = useUIStore((state) => state.overPageId);
	const setActiveSectionId = useUIStore((state) => state.setActiveSectionId);
	const setIsNavOpened = useUIStore((state) => state.setIsNavOpened);
	const setPointerPosition = useUIStore((state) => state.setPointerPosition);
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { pathname } = useLocation();

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

	const setScrollContainerRef = (node: HTMLDivElement | null) =>
		(scrollContainerRef.current = node);

	const setSectionRefs = (sectionId: number, node: HTMLElement | null) => {
		if (node) {
			sectionRefs.current[sectionId] = node;
		} else {
			delete sectionRefs.current[sectionId];
		}
	};

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

	const activeSectionTheme = useMemo<ThemeType>(
		() =>
			t(
				`${pageId}:sections.${activeSectionId}.theme`,
				config.themes.default
			) as ThemeType,
		[t, pageId, activeSectionId]
	);

	useEffect(() => {
		if (scrollContainerRef.current === null) return;

		setIsNavOpened(false);
		scrollContainerRef.current.scroll({
			top: 0,
			behavior: 'smooth',
		});
	}, [pathname, setIsNavOpened]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible.length > 0) {
					const target = visible[0].target as HTMLElement;
					setActiveSectionId(Number(target.dataset.id));
				}
			},
			{ threshold: 0.5 }
		);

		const id = requestAnimationFrame(() => {
			if (!Object.values(sectionRefs.current).every(Boolean)) return;

			Object.keys(sectionRefs.current).forEach((k) => {
				const ref = sectionRefs.current[Number(k)];
				if (ref) observer.observe(ref);
			});
		});

		return () => {
			observer.disconnect();
			cancelAnimationFrame(id);
		};
	}, [pathname, setActiveSectionId]);

	useEffect(() => {
		const handlePointerMove = (e: MouseEvent) => {
			setPointerPosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('pointermove', handlePointerMove);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
		};
	}, [setPointerPosition]);

	return (
		<SettingsContext.Provider
			value={{
				scrollContainerRef,
				sectionRefs,
				pageTheme,
				overTheme,
				activeSectionTheme,

				setScrollContainerRef,
				setSectionRefs,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
