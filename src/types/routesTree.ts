interface RoutesTree {
	path: string;
	id?: string;
	current?: string;
	parent?: string;
	children?: RoutesTree[];
}
export default RoutesTree;
