export default interface Translation {
	TITLE: string;
	nav: {
		[key: string]: string;
	};
	com: {
		[key: string]: string;
	};
	info: {
		[key: string]: {
			[key: string]: string;
		};
	};
	pages: {
		[key: string]: {
			sections: Section[];
		};
	};
}
interface Section {
	layout: string;
	theme: string;
	TITLE?: string;
	SLIDE_TITLE?: string;
	SUBTITLE?: string;
	TEXT?: string;
	imageBlob?: boolean;
	images?: Image[];
	counters?: Counter[];
	periods?: Period[];
	btns?: Btn[];
	lists?: List[];
	brands?: Brand[];
}
interface Image {
	file: string;
	fileSm?: string;
}
interface Counter {
	since: string;
	className?: string;
	classNamePreBr?: string;
	classNamePostBr?: string;
	br?: string;
	PREFX?: string;
	SUFFX?: string;
}
interface Period {
	dates: string[];
	title: string;
	company: string;
	type?: string;
	city?: string;
	country?: string;
	highlight?: boolean;
}
interface Btn {
	TEXT: string;
	type: string;
	url: string;
	className?: string;
}
interface List {
	TITLE?: string;
	_?: string[];
}
interface Brand {
	name: string;
	logo: string;
}
