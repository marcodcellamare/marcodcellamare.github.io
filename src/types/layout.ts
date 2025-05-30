export type ThemeType =
	| 'light-gray'
	| 'gray'
	| 'dark-gray'
	| 'red'
	| 'purple'
	| 'green';

export interface SectionInterface {
	theme: ThemeType;
	title?: string;
}
