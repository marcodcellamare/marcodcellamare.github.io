import { ThemeType } from './layout';

export interface SettingsContextProps {
	overPageId: PageIdType | null;
	isNavOpened: boolean;
	theme: ThemeType;
	overTheme: ThemeType | null;

	setOverPageId: (pageId: PageIdType | null) => void;
	setIsNavOpened: (isOpened: boolean) => void;
}
