import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@components/Layout';
import Google from '@components/Misc/Google';
import { useRouter } from '@providers/router';
import ItfRoutesTree from '@interfaces/routesTree';
import '@styles/main.scss';

const App = () => {
	const { i18n } = useTranslation();
	const router = useRouter();

	return (
		<>
			<Helmet
				titleTemplate={'%s - ' + i18n.t('TITLE')}
				defaultTitle={i18n.t('TITLE')}
				htmlAttributes={{ lang: i18n.language }}
			/>
			<Google />
			<Routes>
				{router.iterate().map((route: ItfRoutesTree, k: number) => (
					<Route
						key={k}
						path={route.path}
						index={route.path === '/'}
						element={
							<Layout
								key={route.id}
								route={route}
							/>
						}
					/>
				))}
				<Route
					path='*'
					element={
						<Navigate
							to={router.home}
							replace
						/>
					}
				/>
			</Routes>
		</>
	);
};
export default App;
