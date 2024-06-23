import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import '../styles/main.scss';
import Location from './components/Router/Location';

import Home from './pages/Home';

const App = () => {
	const { i18n } = useTranslation();

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
				<Route
					path='/'
					element={<Home />}
				/>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
