import { create } from 'zustand';
import { PageIdType } from '@/types/config.const';

type PointerPosition = { x: number; y: number };

interface UIStoreInterface {
	isNavOpened: boolean;
	isLoading: boolean;
	isLoaderTickled: boolean;
	overPageId: PageIdType | null;
	activeSectionId: number;
	pointerPosition: PointerPosition;

	spacing: Record<string, string>;

	setIsNavOpened: (v: boolean) => void;
	setIsLoading: (v: boolean) => void;
	setIsLoaderTickled: (v: boolean) => void;
	setOverPageId: (v: PageIdType | null) => void;
	setActiveSectionId: (v: number) => void;
	setPointerPosition: (pos: PointerPosition) => void;
}

export const useUIStore = create<UIStoreInterface>((set) => ({
	isNavOpened: false,
	isLoading: false,
	isLoaderTickled: false,
	overPageId: null,
	activeSectionId: 0,
	pointerPosition: { x: 0, y: 0 },

	spacing: {
		absEdge: 'm-5 md:m-10',
		absEdgePadding: 'p-5 md:p-10',
		nav: 'p-5 md:p-10 lg:p-25',
		section: 'py-30 lg:py-35 xl:py-40',
		container: 'px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-50 3xl:px-80',
		carouselItem: 'px-5 md:px-10 lg:px-20 xl:px-30 2xl:pl-50 3xl:pl-80',
		content: 'gap-8 lg:gap-12 3xl:gap-24',
		footer: 'py-4 md:py-5',
	},

	setIsNavOpened: (v) => set({ isNavOpened: v }),
	setIsLoading: (v) => set({ isLoading: v }),
	setIsLoaderTickled: (v) => set({ isLoaderTickled: v }),
	setOverPageId: (v) => set({ overPageId: v }),
	setActiveSectionId: (v) => set({ activeSectionId: v }),
	setPointerPosition: (pos) => set({ pointerPosition: pos }),
}));
