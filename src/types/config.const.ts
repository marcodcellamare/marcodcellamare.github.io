import { GROUPS, LOCALES, PAGES, PALETTE, TEMPLATES, THEMES } from '@const';

export type LocaleType = (typeof LOCALES)[number];
export type GroupType = (typeof GROUPS)[number];
export type PageIdType = keyof typeof PAGES;
export type PaletteType = (typeof PALETTE)[number];
export type ThemeType = (typeof THEMES)[number];
export type TemplateType = (typeof TEMPLATES)[number];
