export type MoodStatusType = 'idle' | 'init' | 'typing' | 'typed';
export type MoodType = 'love' | 'hate' | 'music' | 'play' | 'code';

export interface MoodInterface {
	id?: number;
	type: MoodType;
	title: string;
	link?: string;
}
