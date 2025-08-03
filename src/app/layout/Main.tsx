import { useUIStore } from '@/stores/useUIStore';
import { SectionProvider } from '@/contexts/section';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import { useResize } from '@/contexts/resize';

import Section from './Section';

import { SectionInterface } from '@/types/layout';

const Main = () => {
	const { setMainContainerRef, setScrollContainerRef, mainContainerRef } =
		useUIStore();

	const pageId = useUIStore((state) => state.pageId);
	const pageTheme = useUIStore((state) => state.pageTheme);

	const sections = useTranslationFallback<SectionInterface[]>(
		`sections`,
		[],
		pageId
	);

	useResize(() => {
		const container = mainContainerRef.current;
		if (!container) return;

		const rect = container.getBoundingClientRect();

		document.documentElement.style.setProperty(
			'--main-vw',
			`${rect.width}px`
		);
		document.documentElement.style.setProperty(
			'--main-vh',
			`${rect.height}px`
		);
	});

	return (
		<main
			ref={setMainContainerRef}
			data-theme={pageTheme}
			className='flex flex-col flex-1 h-full relative z-0'>
			{sections.length > 0 && (
				<div
					ref={setScrollContainerRef}
					className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto snap-y snap-proximity scroll-smooth no-scrollbar'>
					{sections.map((_, k) => (
						<SectionProvider
							key={`${pageId}.${k}`}
							sectionId={k}>
							<Section
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
