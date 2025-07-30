import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/stores/useUIStore';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

import config from '@config';

import { PageIdType } from '@/types/config.const';

interface RouterProviderProps {
	children: ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
	const {
		isScrollContainerRefReady,
		scrollContainerRef,
		sectionRefs,
		areAllSectionRefsReady,
	} = useUIStore();
	const setPageId = useUIStore((state) => state.setPageId);
	const setIsNavOpened = useUIStore((state) => state.setIsNavOpened);
	const setActiveSectionId = useUIStore((state) => state.setActiveSectionId);

	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(
		() =>
			setPageId(
				(Object.entries(config.pages.list).find(
					([, value]) =>
						value === pathname ||
						value === `${config.pages.hide}${pathname}`
				)?.[0] ?? config.pages.default) as PageIdType
			),
		[pathname, setPageId]
	);

	// Scroll to top when the location changes

	useEffect(() => {
		if (scrollContainerRef.current === null) return;

		setIsNavOpened(false);
		if (scrollContainerRef.current.scrollTop > 0)
			scrollContainerRef.current.scroll({
				top: 0,
				behavior: 'smooth',
			});
	}, [
		pathname,
		setIsNavOpened,
		isScrollContainerRefReady,
		scrollContainerRef,
	]);

	// Get the active section (debounced)

	const intersectionObserverDebounced = useDebounceCallback(
		(entries: IntersectionObserverEntry[]) => {
			const visible = entries
				.filter((e) => e.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

			if (visible.length > 0) {
				const target = visible[0].target as HTMLElement;
				setActiveSectionId(Number(target.dataset.id));
			}
		},
		50
	);

	// Get the active section

	useEffect(() => {
		let frameId: number;
		const observer = new IntersectionObserver(
			intersectionObserverDebounced,
			{ threshold: 0.5 }
		);
		const waitForRefs = () => {
			if (!areAllSectionRefsReady()) {
				frameId = requestAnimationFrame(waitForRefs);
				return;
			}
			Object.values(sectionRefs.current ?? {}).forEach((ref) => {
				if (ref) observer.observe(ref);
			});
		};
		frameId = requestAnimationFrame(waitForRefs);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frameId);
		};
	}, [
		pathname,
		sectionRefs,
		areAllSectionRefsReady,
		setActiveSectionId,
		intersectionObserverDebounced,
	]);

	// Redirect from trailing slash to no trailing slash

	useEffect(() => {
		if (pathname !== '/' && pathname.endsWith('/'))
			navigate(pathname.replace(/\/+$/, ''), { replace: true });
	}, [pathname, navigate]);

	return children;
};
