import { TemplateType, ThemeType } from './config.const';

export interface SectionInterface {
	theme: ThemeType;
	template?: TemplateType;
	title?: string;
	heading?: HeadingInterface;
	content?: ContentInterface;
}

interface HeadingInterface {
	headline?: string;
	title: string;
	subtitle?: string;
}

interface ContentInterface {
	leading?: string;
	paragraphs?: string[];
}
