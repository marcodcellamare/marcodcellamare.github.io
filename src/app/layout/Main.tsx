import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { ParallaxProvider } from 'react-scroll-parallax';

import Section from './Section';

import { SectionInterface } from '!/types/layout';

const Main = () => {
	const { t } = useTranslation();
	const { pageId } = useRouter();

	const [container, setContainer] = useState<HTMLElement | undefined>(
		undefined
	);

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const sections = t(`${pageId}:sections`, {
		returnObjects: true,
	}) as SectionInterface[];

	useEffect(() => {
		if (scrollContainerRef.current)
			setContainer(scrollContainerRef.current);
	}, []);

	return (
		<main className='flex flex-col flex-1 relative'>
			<div
				ref={scrollContainerRef}
				className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto scrollbar'>
				{container && sections.length > 0 ? (
					<ParallaxProvider scrollContainer={container}>
						{sections.map((section, k) => (
							<Section
								key={k}
								sectionId={k}
								theme={section.theme}>
								<div className='content'>
									<div className='heading'>
										<h2 className='h1 text-primary'>
											{section.title}
										</h2>
										<h3 className='h2 text-secondary'>
											{section.title}
										</h3>
										<h4 className='h3 text-accent'>
											{section.title}
										</h4>
									</div>
									<h5 className='h4 text-accent'>
										{section.title}
									</h5>
									<h6 className='h5 text-accent'>
										{section.title}
									</h6>
									<h6 className='h6 text-accent'>
										{section.title}
									</h6>
									<p>{section.title}</p>
								</div>
							</Section>
						))}
					</ParallaxProvider>
				) : null}
			</div>
		</main>
	);
};
export default Main;
