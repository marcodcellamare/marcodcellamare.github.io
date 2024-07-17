import { ImageTemplate } from '@interfaces/template/image';
import { Counter, CounterTemplate } from '@interfaces/template/counter';
import { PeriodTemplate } from '@interfaces/template/period';
import { Button, ButtonTemplate } from '@interfaces/template/button';
import { List } from '@interfaces/template/list';

export interface Section {
	TITLE?: string;
	SLIDE_TITLE?: string;
	SUBTITLE?: string;
	TEXT?: string;
	counters?: Counter[];
	buttons?: Button[];
	lists?: List[];
}
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
