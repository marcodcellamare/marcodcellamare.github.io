import { TemplateType, ThemeType } from './config.const';

export type ImagePositionType = 'left' | 'right';
export type ImageIconType = 'HELLO' | string;

export interface SectionInterface {
	theme: ThemeType;
	template?: TemplateType;
	background: BackgroundInterface;
	settings?: SettingsInterface;
	title?: string;
	content?: ContentInterface[];
	drawer?: ContentInterface[];
}

export interface HeadingInterface {
	headline?: string;
	title: string;
	subtitle?: string;
}

export interface ImageInterface {
	src: string | 'ICON';
	icon?: ImageIconType;
	blob?: boolean;
	position?: ImagePositionType;
}

export interface ContentInterface {
	image?: ImageInterface;
	heading?: HeadingInterface;
	leading?: string;
	paragraphs?: string[];
	list?: string[];
	links?: (number | string)[];
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
