import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Template from '../../templates/home.json';
import TemplateInterface from '../../types/template';

console.log(Template);

const Home = () => {
	const location = useLocation();
	const { i18n } = useTranslation();
	const template = Template as TemplateInterface[];

	console.log(template);

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
					<div key={k}>
						{i18n.t('TITLE')}
						{t.layout}
						{t.theme}
					</div>
				);
			})}
		</>
	);
};
export default Home;
