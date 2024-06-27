import RoutesTreeInterface from '@interfaces/routesTree';

// Recursive function to map the nav object

const tree = (routes: RoutesTreeInterface[]) =>
	routes
		.map((route) => [route.children ? tree(route.children) : [], route])
		.flat(Infinity);

export default tree;
