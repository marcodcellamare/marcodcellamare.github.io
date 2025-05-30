export interface RouterContextProps {
	pageId: pageType;
	isNavOpened: boolean;

	setIsNavOpened: (isOpened: boolean) => void;
}
