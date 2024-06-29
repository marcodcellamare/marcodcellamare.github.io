import { Section } from '@interfaces/template/section';

export default interface Translation {
	TITLE: string;
	nav: {
		[key: string]: string;
	};
	com: {
		[key: string]: string | string[];
	};
	info: {
		[key: string]: {
			[key: string]: string;
		};
	};
	pages: {
		[key: string]: {
			TITLE?: string;
			DESCRIPTION?: string;
			sections: Section[];
		};
	};
}
