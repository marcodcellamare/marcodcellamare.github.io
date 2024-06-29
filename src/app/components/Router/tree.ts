import RoutesTreeInterface from '@interfaces/routesTree';

// Recursive function to map the nav object

const tree = (routes: RoutesTreeInterface[]) => {
	let flatRoutes = routes
		.map((route) => {
			let newRoute = [
				{ ...route },
				route.children ? tree(route.children) : [],
			];
			return newRoute;
		})
		.flat(Infinity);

	// Calculating the deep level

	flatRoutes.forEach((flatRoute: RoutesTreeInterface) => {
		const parent = flatRoutes.find(({ path }) => path === flatRoute.parent);
		flatRoute.deep = parent ? parent.deep + 1 : 0;
	});
	return flatRoutes;
};
export default tree;
