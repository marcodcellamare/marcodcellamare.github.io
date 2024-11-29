export interface Counter {
	TITLE?: string;
	PREFX?: string;
	SUFFX?: string;
}
export interface CounterTemplate {
	since: string;
	showOnly: string[];
	className?: string;
	classNamePre?: string;
	classNamePost?: string;
	classNameWrapper?: string;
	newLineAt?: string;
}
