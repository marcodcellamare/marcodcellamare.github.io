import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useTemplate } from '@components/Provider/Template';
import { useScrollingPosition } from '@hooks';
import Section from './Section';
import RoutesTreeInterface from '@interfaces/routesTree';

const Main = ({ route }: { route: RoutesTreeInterface }) => {
	const { i18n } = useTranslation();
	const template = useTemplate();
	const ref = useRef();
	const scrollPosition = useScrollingPosition(ref);
	const [active, setActive] = useState({ id: 0, theme: '' });

	const slideTo = useCallback((offsetTop: number) => {
		// This function runs a smooth slide on the current slide
		let current: HTMLElement = null;

		if (ref.current) {
			current = ref.current;
			current.scroll({
				top: Math.ceil(offsetTop),
				behavior: 'smooth',
			});
		}
	}, []);

	const gatedSetActive = useCallback(
		({ id, theme }: { id: number; theme: string }) => {
			setActive({ id, theme });
		},
		[]
	);

	useEffect(() => {
		// When the route changes, slide to top
		slideTo(0);
	}, [route.id, slideTo]);

	useEffect(() => {
		// WHen the theme changes, set the html class with it
		let html: HTMLElement & { classList: DOMTokenList | '' } =
			document.documentElement;

		html.classList.forEach((className) => {
			if (className !== 'transition') html.classList.remove(className);
		});
		if (active.theme) {
			html.classList.add(active.theme);
			html.classList.add('transition');
		}
	}, [active.theme]);

	return (
		<>
			<Helmet>
				<title>{i18n.t([`page.${route.id}:TITLE`, ''])}</title>
				<meta
					name='description'
					content={i18n.t([`page.${route.id}:DESCRIPTION`, ''])}
				/>
			</Helmet>
			<main className='flex-grow-1 position-relative'>
				<article
					ref={ref}
					className='position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto'>
					{template.map((sectionTemplate, k) => {
						return (
							<Section
								key={k}
								id={k}
								route={route}
								total={template.length}
								//template={sectionTemplate}
								scrollPosition={scrollPosition}
								slideTo={slideTo}
								setActive={gatedSetActive}
							/>
						);
					})}
				</article>
			</main>
		</>
	);
};
export default Main;
