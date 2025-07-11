import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { SettingsContext } from './context';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRouter } from '!/contexts/router';

import config from '!config';

import { PageIdType, ThemeType } from '!/types/config.const';

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { pathname } = useLocation();

	const [overPageId, setOverPageId] = useState<PageIdType | null>(null);
	const [isNavOpened, setIsNavOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoaderTickled, setIsLoaderTickled] = useState(false);
	const [activeSectionId, setActiveSectionId] = useState(0);
	const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

	const spaceRef = useRef({
		absEdge: 'm-5 md:m-10',
		nav: 'p-20',
		section: 'py-20 lg:py-30 xl:py-40',
		container: 'px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-50 3xl:px-80',
		carouselItem: 'px-5 md:pl-10 lg:pl-20 xl:pl-30 2xl:pl-50 3xl:pl-80',
		content: 'gap-8 lg:gap-12 3xl:gap-24',
		footer: 'py-4 md:py-5',
	});

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

	const memoizedSetIsNavOpened = useCallback(setIsNavOpened, [
		setIsNavOpened,
	]);
	const memoizedSetOverPageId = useCallback(setOverPageId, [setOverPageId]);
	const memoizedSetIsLoading = useCallback(setIsLoading, [setIsLoading]);
	const memoizedSetIsLoaderTickled = useCallback(setIsLoaderTickled, [
		setIsLoaderTickled,
	]);

	useEffect(() => {
		if (scrollContainerRef.current === null) return;

		scrollContainerRef.current.scroll({
			top: 0,
			behavior: 'smooth',
		});
	}, [pathname]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const target = entry.target as HTMLElement;
						setActiveSectionId(Number(target.dataset.id));
						return;
					}
				});
			},
			{ threshold: [0.1, 0.5, 0.9] }
		);

		const id = requestAnimationFrame(() => {
			Object.keys(sectionRefs.current).forEach((k) => {
				const ref = sectionRefs.current[Number(k)];
				if (ref) observer.observe(ref);
			});
		});

		return () => {
			observer.disconnect();
			cancelAnimationFrame(id);
		};
	}, [pathname]);

	useEffect(() => {
		const handlePointerMove = (e: MouseEvent) => {
			setPointerPosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('pointermove', handlePointerMove);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
		};
	}, []);

	return (
		<SettingsContext.Provider
			value={{
				scrollContainerRef,
				sectionRefs,
				spaceRef,
				overPageId,
				isNavOpened,
				pageTheme,
				overTheme,
				isLoading,
				isLoaderTickled,
				activeSectionId,
				activeSectionTheme,
				pointerPosition,

				setScrollContainerRef,
				setSectionRefs,
				setOverPageId: memoizedSetOverPageId,
				setIsNavOpened: memoizedSetIsNavOpened,
				setIsLoading: memoizedSetIsLoading,
				setIsLoaderTickled: memoizedSetIsLoaderTickled,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
