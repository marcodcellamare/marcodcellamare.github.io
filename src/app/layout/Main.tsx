import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';
import { useSettings } from '!/contexts/settings';
import { SectionProvider } from '!/contexts/section';

import Section from './Section';

import { SectionInterface } from '!/types/layout';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Main = () => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { pathname } = useLocation();
	const { scrollContainerRef } = useParallax();
	const { sectionTemplate, sectionTheme } = useSettings();

	const sections = t('sections', {
		returnObjects: true,
		defaultValue: [],
	}) as SectionInterface[];

	useEffect(() => {
		if (scrollContainerRef.current === null) return;

		scrollContainerRef.current.scroll({
			top: 0,
			behavior: 'smooth',
		});
	}, [pathname, scrollContainerRef]);

	return (
		<main className='flex flex-col flex-1 h-full relative'>
			{sections.length > 0 ? (
				<div
					ref={scrollContainerRef}
					className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto scrollbar'>
					{sections.map((_, k) => (
						<SectionProvider
							key={k}
							sectionId={k}
							template={sectionTemplate(k)}
							theme={sectionTheme(k)}>
							<Section />
						</SectionProvider>
					))}
				</div>
			) : null}
		</main>
	);
};
export default Main;
