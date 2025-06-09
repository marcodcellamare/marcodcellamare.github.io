import { PageIdType, TemplateType, ThemeType } from './config.const';

export interface SettingsContextProps {
	overPageId: PageIdType | null;
	isNavOpened: boolean;
	pageTheme: ThemeType;
	overTheme: ThemeType | null;

	sectionTheme: (sectionId: number) => ThemeType;
	sectionTemplate: (sectionId: number) => TemplateType;

	setOverPageId: (pageId: PageIdType | null) => void;
	setIsNavOpened: (isOpened: boolean) => void;
}
