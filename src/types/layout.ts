import { TemplateType, ThemeType } from './config.const';

export interface SectionInterface {
	theme: ThemeType;
	template?: TemplateType;
	settings?: SettingsInterface;
	title?: string;
	content?: ContentInterface;
}

interface HeadingInterface {
	headline?: string;
	title: string;
	subtitle?: string;
}

export interface ContentInterface {
	heading?: HeadingInterface;
	leading?: string;
	paragraphs?: string[];
	links?: string[];
}

export interface SettingsInterface {
	className?: string;
	children?: {
		className?: string;
	};
}
