import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
	HashRouter as BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import RoutesTree from '../types/routesTree';

import { tree as routeTree, paths as routePaths } from './components/Router';
import Config from '../config.json';
import '../styles/main.scss';

//import Home from './pages/Home';

const App = () => {
	const { i18n } = useTranslation();
	const nav: RoutesTree[] = [Config.NAV];

	return (
		<BrowserRouter>
			<Helmet
				titleTemplate={'%s - ' + i18n.t('TITLE')}
				defaultTitle={i18n.t('TITLE')}
				htmlAttributes={{ lang: i18n.language }}>
				<meta
					name='description'
					content='demo'
				/>
			</Helmet>
			<Routes>
				{routeTree(routePaths(nav)).map(
					(route: RoutesTree, k: number) => (
						<Route
							key={k}
							path={route.path}
							index={route.path === '/'}
							element={<div>ID: {route.id}</div>}
						/>
					)
				)}
				<Route
					path='*'
					element={
						<Navigate
							to={nav[0].path}
							replace
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
