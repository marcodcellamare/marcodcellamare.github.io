import { TemplateType, ThemeType } from './config.const';

export type ImagePositionType = 'left' | 'right';
export type ImageIconType = 'icon:hello' | 'icon:development' | 'icon:music';
export type LinkType = number | string;

export interface SectionInterface {
	theme: ThemeType;
	template?: TemplateType;
	background: BackgroundInterface;
	settings?: SettingsInterface;
	title?: string;
	content?: ContentInterface[];
	brands?: Record<string, string>;
	images?: string[];
	drawer?: ContentInterface[];
}

export interface HeadingInterface {
	headline?: string;
	title: string;
	subtitle?: string;
}

export interface ImageInterface {
	src: string | ImageIconType;
	blob?: boolean;
	position?: ImagePositionType;
}

export interface ContentInterface {
	image?: ImageInterface;
	heading?: HeadingInterface;
	leading?: string;
	paragraphs?: string[];
	list?: string[];
	links?: LinkType[];
}

export interface BackgroundInterface {
	src: string;
	contain?: boolean;
	className?: string;
	pictureClassName?: string;
}

export interface SettingsInterface {
	className?: string;
	children?: {
		className?: string;
	};
}
