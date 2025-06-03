export type ThemeType =
	| 'light-gray'
	| 'gray'
	| 'dark-gray'
	| 'red'
	| 'purple'
	| 'green';

export type TemplateType = 'full' | 'left' | 'right';

export interface SectionInterface {
	theme: ThemeType;
	template?: TemplateType;
	heading?: {
		h0?: string;
		h1?: string;
		h2?: string;
		h3?: string;
	};
	content?: string;
}
