import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';

import Section from './Section';

import { SectionInterface } from '!/types/layout';

const Main = () => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { scrollContainerRef } = useParallax();

	const sections = t('sections', {
		returnObjects: true,
		defaultValue: [],
	}) as SectionInterface[];

	return (
		<main className='flex flex-col flex-1 h-full relative'>
			{sections.length > 0 ? (
				<div
					ref={scrollContainerRef}
					className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto scrollbar'>
					{sections.map((_, k) => (
						<Section
							key={k}
							sectionId={k}
						/>
					))}
				</div>
			) : null}
		</main>
	);
};
export default Main;
