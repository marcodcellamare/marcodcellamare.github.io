import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useLocationExt } from '../../hooks';

import Template from '../../templates/home.json';
import TemplateInterface from '../../types/template';

console.log(Template);

const Home = ({ path }: { path: string }) => {
	const location = useLocationExt();
	const { i18n } = useTranslation();
	const template = Template as TemplateInterface[];

	console.log('HOME', location);

	return (
		<>
			<Helmet>
				<title>Home</title>
				<meta
					name='description'
					content='A React Boilerplate application homepage'
				/>
			</Helmet>
			{template.map((t, k) => {
				return (
					<ul key={k}>
						<li>{i18n.t('TITLE')}</li>
						<li>{t.layout}</li>
						<li>{t.theme}</li>
						<li>{path}</li>
					</ul>
				);
			})}
		</>
	);
};
export default Home;
