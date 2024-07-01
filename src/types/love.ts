export default interface Love {
	id?: number;
	type: 'love' | 'hate' | 'music' | 'play' | 'code';
	title?: string;
	link?: string;
}
