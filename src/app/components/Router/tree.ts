import RoutesTree from '../../../types/routesTree';

// Recursive function to map the nav object

const tree = (routes: RoutesTree[]) =>
	routes
		.map((route) => [route.children ? tree(route.children) : [], route])
		.flat(Infinity);

export default tree;
