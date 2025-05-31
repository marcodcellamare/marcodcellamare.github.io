declare module 'config.json' {
	const value: {
		html: HtmlInterface;
		locale: LocaleInterface;
		pages: PagesInterface;
		meta: MetaType;
		preload: PreloadType;
	};
	export default value;
}

type LocaleType = 'en-GB';
type GroupType = 'default' | PageIdType;
type PageIdType = 'home' | 'projects' | 'projects_test' | 'music' | 'contacts';

interface HtmlInterface {
	whitelist: string[];
}

interface LocaleInterface {
	allowed: {
		default: LocaleType;
		list: LocaleType[];
	};
	groups: {
		default: GroupType;
		list: GroupType[];
	};
}

interface PagesInterface {
	default: PageIdType;
	hide: string;
	list: Record<PageIdType, string>;
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
	crossorigin?: string;
}>;
