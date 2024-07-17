import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
	HashRouter as BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Layout from '@components/Layout';
import { Google } from '@components/Misc';
import routeTree from '@components/Router/tree';
import routePaths from '@components/Router/paths';
import Config from '@config';
import RoutesTreeInterface from '@interfaces/routesTree';
import '@styles/main.scss';

const App = () => {
	const { i18n } = useTranslation();
	const nav: RoutesTreeInterface[] = [Config.nav];

	return (
		<BrowserRouter>
			<Helmet
				titleTemplate={'%s - ' + i18n.t('TITLE')}
				defaultTitle={i18n.t('TITLE')}
				htmlAttributes={{ lang: i18n.language }}
			/>
			<Google />
			<Routes>
				{routeTree(routePaths(nav)).map(
					(route: RoutesTreeInterface, k: number) => (
						<Route
							key={k}
							path={route.path}
							index={route.path === '/'}
							element={
								<Layout
									key={route.path}
									route={route}
								/>
							}
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
