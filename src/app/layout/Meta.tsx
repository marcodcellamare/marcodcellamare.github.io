import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';

import Favicon from '../misc/Favicon';
import Config from '!config';

import pkg from '!package';

type CrossOrigin = 'anonymous' | 'use-credentials' | undefined;

const Meta = () => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	useEffect(
		() => document.documentElement.setAttribute('lang', i18n.language),
		[i18n.language]
	);

	const title = `${import.meta.env.DEV ? '[DEV] ' : ''}${
		pageId !== Config.pages.default ? `${t('title')} - ` : ''
	}${t('default:title')} v${pkg.version}`;

	return (
		<>
			<title>{title}</title>
			<h1 hidden>{title}</h1>
			<meta
				name='description'
				content={t('default:description', '')}
			/>
			<Favicon />
			{Config.preload.map((preload, k) => (
				<link
					key={k}
					rel={preload.rel}
					href={preload.href}
					crossOrigin={preload.crossorigin as CrossOrigin}
				/>
			))}
			{Config.meta.map((meta, k) => (
				<meta
					key={k}
					name={meta.name}
					httpEquiv={meta.httpEquiv}
					content={
						Array.isArray(meta.content)
							? meta.content.join('; ')
							: meta.content
					}
				/>
			))}
		</>
	);
};
export default Meta;
