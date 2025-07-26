import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';

import Fonts from './Fonts';
import Favicon from '@/app/misc/Favicon';

import config from '@config';
import pkg from '@package';

const Meta = () => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n, t } = useTranslation(pageId);

	useEffect(
		() => document.documentElement.setAttribute('lang', i18n.language),
		[i18n.language]
	);

	const title = `${import.meta.env.DEV ? '[DEV] ' : ''}${
		pageId !== config.pages.default ? `${t('title')} - ` : ''
	}${t('default:title')} v${pkg.version}`;

	return (
		<>
			<title>{title}</title>
			<h1 hidden>{title}</h1>
			<meta
				name='description'
				content={t('description', '')}
			/>
			<Favicon />
			{config.preload.map((preload, k) => (
				<link
					key={k}
					rel={preload.rel}
					href={preload.href}
					crossOrigin={preload.crossorigin}
					precedence='default'
				/>
			))}
			{config.meta.map((meta, k) => (
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
			<Fonts />
		</>
	);
};
export default Meta;
