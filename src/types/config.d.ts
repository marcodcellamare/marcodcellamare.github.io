declare module 'config.json' {
	const value: {
		locale: localeInterface;
		pages: pagesInterface;
		meta: metaType;
		preload: preloadType;
	};
	export default value;
}

type localeType = 'en-GB';
type groupType = 'default' | pageType;
type pageType = 'home' | 'projects' | 'projects_test' | 'contacts';

interface localeInterface {
	allowed: {
		default: localeType;
		list: localeType[];
	};
	groups: {
		default: groupType;
		list: groupType[];
	};
}

interface pagesInterface {
	default: pageType;
	hide: string;
	list: Record<pageType, string>;
}

type metaType = Array<
	| {
			httpEquiv: string;
			content: string | string[];
	  }
	| {
			name: string;
			content: string;
	  }
>;

type preloadType = Array<{
	rel: 'dns-prefetch' | 'dns-preconnect' | 'preconnect';
	href: string;
	crossorigin?: string;
}>;
