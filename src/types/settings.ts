import { TemplateType, ThemeType } from './layout';

export interface SettingsContextProps {
	overPageId: PageIdType | null;
	isNavOpened: boolean;
	theme: ThemeType;
	overTheme: ThemeType | null;

	sectionTheme: (sectionId: number) => ThemeType;
	sectionTemplate: (sectionId: number) => TemplateType;

	setOverPageId: (pageId: PageIdType | null) => void;
	setIsNavOpened: (isOpened: boolean) => void;
}
