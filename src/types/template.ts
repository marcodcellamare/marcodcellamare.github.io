interface Template {
	layout: string;
	theme: string;
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
	type: string;
	url: string;
	className?: string;
}
interface List {
	_?: string[];
}
interface Brand {
	name: string;
	logo: string;
}
export default Template;
