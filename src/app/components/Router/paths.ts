import RoutesTreeInterface from '@interfaces/routesTree';

// Generates an ID out of the path

const camelize = (path: string): string => {
	if (path === '/') path = 'home';

	return path
		.replace(/\//g, ' ')
		.replace(/-/g, ' ')
		.trim()
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (word, k) => {
			return word.toUpperCase();
		})
		.replace(/\s+/g, '');
};

// Combine the relative paths to get the full path

const combine = (parent: string, child: string): string =>
	`${parent.replace(/\/$/, '')}/${child.replace(/^\//, '')}`;

// Adds the full path and the ID to the nav

const build = (
	nav: RoutesTreeInterface[],
	parentPath: string = ''
): RoutesTreeInterface[] =>
	nav.map((route) => {
		const path = combine(parentPath, route.path);
		const id = camelize(path);

		return {
			...route,
			path: path,
			id: id,
			current: route.path,
			parent: parentPath,
			...(route.children && { children: build(route.children, path) }),
		};
	});

export default build;
