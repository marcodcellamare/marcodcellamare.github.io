export default interface ItfRoutesTree {
	path: string;
	id?: string;
	current?: string;
	parent?: string;
	children?: ItfRoutesTree[];
	hidden?: boolean;
	deep?: number;
}
