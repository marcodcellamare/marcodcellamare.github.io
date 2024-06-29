interface RoutesTree {
	path: string;
	id?: string;
	current?: string;
	parent?: string;
	children?: RoutesTree[];
	hidden?: boolean;
	deep?: number;
}
export default RoutesTree;
