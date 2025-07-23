import { useRouter } from '@/contexts/router';
import { useSettings } from '@/contexts/settings';
import { SectionProvider } from '@/contexts/section';
import useTranslationFallback from '@/hooks/useTranslationFallback';

import Section from './Section';

import { SectionInterface } from '@/types/layout';

const Main = () => {
	const { pageId } = useRouter();
	const { setScrollContainerRef } = useSettings();

	const sections = useTranslationFallback<Partial<SectionInterface[]>>(
		`sections`,
		[],
		pageId
	);

	return (
		<main className='flex flex-col flex-1 h-full relative z-0'>
			{sections.length > 0 && (
				<div
					ref={setScrollContainerRef}
					className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto snap-y snap-proximity scroll-smooth'>
					{sections.map((_, k) => (
						<SectionProvider
							key={`${pageId}.${k}`}
							sectionId={k}>
							<Section
								sectionId={k}
								isFirst={k === 0}
								isLast={k === sections.length - 1}
								className='snap-start'
							/>
						</SectionProvider>
					))}
				</div>
			)}
		</main>
	);
};
export default Main;
