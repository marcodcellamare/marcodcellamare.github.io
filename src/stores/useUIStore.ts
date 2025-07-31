import { RefObject } from 'react';
import { create } from 'zustand';

import config from '@config';

import { PageIdType, ThemeType } from '@/types/config.const';

type PointerPosition = { x: number; y: number };

interface UIStoreInterface {
	mainContainerRef: RefObject<HTMLDivElement | null>;
	scrollContainerRef: RefObject<HTMLDivElement | null>;
	sectionRefs: RefObject<Record<number, HTMLElement | null>>;

	pointerPosition: PointerPosition;

	isNavOpened: boolean;
	isLoading: boolean;
	isLoaderTickled: boolean;
	isDrawerOpened: boolean;
	drawerRootKey: string;
	drawerTheme: ThemeType;

	pageId: PageIdType;
	overPageId: PageIdType | null;
	activeSectionId: number;

	pageTheme: ThemeType;
	overPageTheme: ThemeType | null;
	activeSectionTheme: ThemeType;

	spacing: Record<string, string>;

	setMainContainerRef: (node: HTMLDivElement | null) => void;
	setScrollContainerRef: (node: HTMLDivElement | null) => void;
	setSectionRefs: (id: number, node: HTMLElement | null) => void;

	setPointerPosition: (pos: PointerPosition) => void;

	setIsNavOpened: (v: boolean) => void;
	setIsLoading: (v: boolean) => void;
	setIsLoaderTickled: (v: boolean) => void;
	setIsDrawerOpened: (v: boolean) => void;
	setDrawerRootKey: (v: string) => void;
	setDrawerTheme: (v: ThemeType) => void;

	setPageId: (v: PageIdType) => void;
	setOverPageId: (v: PageIdType | null) => void;
	setActiveSectionId: (v: number) => void;

	setPageTheme: (v: ThemeType) => void;
	setOverPageTheme: (v: ThemeType | null) => void;
	setActiveSectionTheme: (v: ThemeType) => void;

	isMainContainerRefReady: boolean;
	isScrollContainerRefReady: boolean;
	areAllSectionRefsReady: () => boolean;
}

const mainContainerRef = {
	current: null,
} as RefObject<HTMLDivElement | null>;

const scrollContainerRef = {
	current: null,
} as RefObject<HTMLDivElement | null>;

const sectionRefs = { current: {} } as RefObject<
	Record<number, HTMLElement | null>
>;

export const useUIStore = create<UIStoreInterface>((set, get) => ({
	mainContainerRef,
	scrollContainerRef,
	sectionRefs,

	pointerPosition: { x: 0, y: 0 },

	isNavOpened: false,
	isLoading: false,
	isLoaderTickled: false,
	isDrawerOpened: false,
	drawerRootKey: '',
	drawerTheme: config.themes.default,

	pageId: config.pages.default,
	overPageId: null,
	activeSectionId: 0,

	pageTheme: config.themes.default,
	overPageTheme: null,
	activeSectionTheme: config.themes.default,

	spacing: {
		absEdge: 'm-5 md:m-10',
		absEdgePadding: 'p-5 md:p-10',
		nav: 'p-5 md:p-10 lg:p-27 pt-24 md:pt-32 lg:pt-40',
		section: 'py-30 lg:py-35 xl:py-40',
		container: 'px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-50 3xl:px-80',
		drawer: 'px-5 md:px-10 xl:px-20 py-30 lg:py-35 xl:py-40',
		carouselItem: 'px-5 md:px-10 lg:px-20 xl:px-30 2xl:pl-50 3xl:pl-80',
		content: 'gap-8 lg:gap-12 3xl:gap-24',
		footer: 'py-4 md:py-5',
	},

	setMainContainerRef: (node) => {
		mainContainerRef.current = node;
		set({ isMainContainerRefReady: node !== null });
	},
	setScrollContainerRef: (node) => {
		scrollContainerRef.current = node;
		set({ isScrollContainerRefReady: node !== null });
	},
	setSectionRefs: (id, node) => {
		if (!get().sectionRefs.current) get().sectionRefs.current = {};

		if (node) {
			get().sectionRefs.current[id] = node;
		} else {
			delete get().sectionRefs.current[id];
		}
	},

	setPointerPosition: (pos) => set({ pointerPosition: pos }),

	setIsNavOpened: (v) => set({ isNavOpened: v }),
	setIsLoading: (v) => set({ isLoading: v }),
	setIsLoaderTickled: (v) => set({ isLoaderTickled: v }),
	setIsDrawerOpened: (v) => set({ isDrawerOpened: v }),
	setDrawerRootKey: (v) => set({ drawerRootKey: v }),
	setDrawerTheme: (v) => set({ drawerTheme: v }),

	setPageId: (v) => set({ pageId: v }),
	setOverPageId: (v) => set({ overPageId: v }),
	setActiveSectionId: (v) => set({ activeSectionId: v }),

	setPageTheme: (v) => set({ pageTheme: v }),
	setOverPageTheme: (v) => set({ overPageTheme: v }),
	setActiveSectionTheme: (v) => set({ activeSectionTheme: v }),

	isMainContainerRefReady: false,
	isScrollContainerRefReady: false,
	areAllSectionRefsReady: () => {
		const refs = Object.values(get().sectionRefs.current ?? {});
		return refs.length > 0 && refs.every((ref) => ref !== null);
	},
}));
