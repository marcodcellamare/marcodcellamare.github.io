export interface ItfSection {
	template: ItfTemplate;
	content: ItfContent;
}
export interface ItfTemplate {
	layout?: string;
	theme?: string;
}
export interface ItfContent {
	NAME?: string;
	TITLE?: string;
	SUBTITLE?: string;
	TEXT?: string;
	//counters?: Counter[];
	//buttons?: Button[];
	//lists?: List[];
}
/*
export interface SectionTemplate {
	layout: string;
	theme: string;
	imageBlob?: boolean;
	images?: ImageTemplate[];
	counters?: CounterTemplate[];
	periods?: PeriodTemplate[];
	buttons?: ButtonTemplate[];
	lists?: string[][];
	brands?: string[];
}
	*/
