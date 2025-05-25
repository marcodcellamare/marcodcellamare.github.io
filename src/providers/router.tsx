import { createContext, useCallback, useContext, useMemo } from 'react';
import tree from '@router/tree';
import paths from '@router/paths';
import Config from '@config';
import ItfRoutesTree from '@interfaces/routesTree';

const RouterProvider = ({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) => {
	const nav: ItfRoutesTree[] = useMemo(() => [Config.nav], []);

	const iterate = useCallback(() => {
		return tree(paths(nav));
	}, [nav]);

	return (
		<RouterContext.Provider value={{ iterate, nav, home: nav[0].path }}>
			{children}
		</RouterContext.Provider>
	);
};

const RouterContext = createContext({
	iterate: () => [],
	nav: [],
	home: '',
});

const useRouter = () => {
	return useContext(RouterContext);
};

export { RouterProvider, useRouter };
