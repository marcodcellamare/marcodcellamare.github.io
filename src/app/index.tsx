import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
	HashRouter as BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Layout from '@components/Layout';
import { useGoogleProvider } from '@hooks';
import { tree as routeTree, paths as routePaths } from '@components/Router';
import Config from '@config';
import RoutesTreeInterface from '@interfaces/routesTree';
import '@styles/main.scss';

const App = () => {
	useGoogleProvider();
	const { i18n } = useTranslation();
	const nav: RoutesTreeInterface[] = [Config.NAV];

	return (
		<BrowserRouter>
			<Helmet
				titleTemplate={'%s - ' + i18n.t('TITLE')}
				defaultTitle={i18n.t('TITLE')}
				htmlAttributes={{ lang: i18n.language }}
			/>
			<Routes>
				{routeTree(routePaths(nav)).map(
					(route: RoutesTreeInterface, k: number) => (
						<Route
							key={k}
							path={route.path}
							index={route.path === '/'}
							element={<Layout route={route} />}
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
