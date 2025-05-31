import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { ParallaxProvider } from 'react-scroll-parallax';

import Section from './Section';

import { SectionInterface } from '!/types/layout';

const Main = () => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);

	const [ready, setReady] = useState(false);

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const sections = t('sections', {
		returnObjects: true,
		defaultValue: [],
	}) as SectionInterface[];

	// Only set ready after a small delay to let the DOM layout stabilize

	useEffect(() => {
		requestAnimationFrame(() => {
			if (scrollContainerRef.current) setReady(true);
		});
	}, []);

	return (
		<main className='flex flex-col flex-1 h-full relative'>
			<div
				ref={scrollContainerRef}
				className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto scrollbar'>
				{ready && scrollContainerRef.current ? (
					<ParallaxProvider
						scrollContainer={scrollContainerRef.current}>
						{sections.map((_, k) => (
							<Section
								key={k}
								sectionId={k}
							/>
						))}
					</ParallaxProvider>
				) : null}
			</div>
		</main>
	);
};
export default Main;
