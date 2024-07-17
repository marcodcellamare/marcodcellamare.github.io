export interface PeriodTemplate {
	dates: [string, ...string[]]; // This will force to have at least one element in the array
	title: string;
	company: string;
	type?: string;
	city?: string;
	country?: string;
	highlight?: boolean;
}
