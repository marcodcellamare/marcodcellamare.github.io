import {
	GroupType,
	LocaleType,
	PageIdType,
	TemplateType,
	ThemeType,
} from './config.const';

type CrossOrigin = '' | 'anonymous' | 'use-credentials' | undefined;

interface HtmlInterface {
	whitelist: string[];
}

interface LocaleInterface {
	allowed: {
		default: LocaleType;
		list: readonly LocaleType[];
	};
	groups: {
		default: GroupType;
		list: readonly GroupType[];
	};
}

interface PagesInterface {
	default: PageIdType;
	hide: string;
	list: Record<PageIdType, string>;
}

interface ThemesInterface {
	default: ThemeType;
	list: readonly ThemeType[];
}

interface TemplatesInterface {
	default: TemplateType;
	list: readonly TemplateType[];
}

type FontsWeightType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface FontInterface {
	family: string;
	weights: FontsWeightType[];
	italic: boolean;
}

type MetaType = Array<
	| {
			httpEquiv: string;
			content: string | string[];
	  }
	| {
			name: string;
			content: string;
	  }
>;

type PreloadType = Array<{
	rel: 'dns-prefetch' | 'dns-preconnect' | 'preconnect';
	href: string;
	crossorigin?: CrossOrigin;
}>;

export default interface ConfigType {
	html: HtmlInterface;
	locale: LocaleInterface;
	pages: PagesInterface;
	themes: ThemesInterface;
	templates: TemplatesInterface;
	fonts: FontInterface[];
	meta: MetaType;
	preload: PreloadType;
}
