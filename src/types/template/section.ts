import { ImageTemplate } from '@interfaces/template/image';
import { Counter, CounterTemplate } from '@interfaces/template/counter';
import { PeriodTemplate } from '@interfaces/template/period';
import { Button } from '@interfaces/template/button';
import { List, ListTemplate } from '@interfaces/template/list';
import { BrandTemplate } from '@interfaces/template/brand';

export interface Section {
	TITLE?: string;
	SLIDE_TITLE?: string;
	SUBTITLE?: string;
	TEXT?: string;
	counters?: Counter[];
	btns?: Button[];
	lists?: List[];
}
export interface SectionTemplate {
	layout: string;
	theme: string;
	imageBlob?: boolean;
	images?: ImageTemplate[];
	counters?: CounterTemplate[];
	periods?: PeriodTemplate[];
	btns?: Button[];
	lists?: ListTemplate[];
	brands?: BrandTemplate[];
}
