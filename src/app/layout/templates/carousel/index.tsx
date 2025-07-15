import { cloneElement, ReactElement, useRef, useState } from 'react';
import { useSection } from '!/contexts/section';
import { useRouter } from '!/contexts/router';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Nav from './Nav';

import { SectionInterface } from '!/types/layout';

interface CarouselProps {
	template: ReactElement<{ slideId: number; className?: string }>;
	className?: string;
}

const Carousel = ({ template, className = '' }: CarouselProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, settings } = useSection();
	const { spaceRef } = useSettings();

	const [activeIdx, setActiveIdx] = useState(0);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	const rootKey = `sections.${sectionId}.content`;

	const contentExists = i18n.exists(`${rootKey}`, {
		ns: pageId,
	});
	const content = t(`${rootKey}`, {
		returnObjects: true,
		defaultValue: [],
	}) as SectionInterface[];

	if (!contentExists) return null;

	return (
		<div
			className={classNames([
				'carousel-wrapper flex relative w-full h-full',
				settings?.className,
				className,
			])}>
			<div
				ref={containerRef}
				className={classNames([
					'flex flex-1 items-center box-border w-full h-full overflow-x-auto snap-x snap-mandatory',
					'scroll-pl-0',
					'sm:scroll-pl-[max((100vw-var(--breakpoint-sm))/2,0rem)]',
					'md:scroll-pl-[max((100vw-var(--breakpoint-md))/2,0rem)]',
					'lg:scroll-pl-[max((100vw-var(--breakpoint-lg))/2,0rem)]',
					'xl:scroll-pl-[max((100vw-var(--breakpoint-xl))/2,0rem)]',
					'2xl:scroll-pl-[max((100vw-var(--breakpoint-2xl))/2,0rem)]',
					'3xl:scroll-pl-0',
					spaceRef.current.section,
				])}>
				<div className='hidden sm:block shrink-0 w-1/2 snap-none' />
				{content.map((_, k) => (
					<div
						key={k}
						ref={(ref) => {
							itemRefs.current[k] = ref;
						}}
						className={classNames([
							'box-border shrink-0',
							'w-full',
							'min-w-fit',
							'max-w-[100vw]',
							'sm:max-w-[var(--breakpoint-sm)]',
							'md:max-w-[var(--breakpoint-md)]',
							'lg:max-w-[var(--breakpoint-lg)]',
							'xl:max-w-[var(--breakpoint-xl)]',
							'2xl:max-w-[var(--breakpoint-2xl)]',
							'3xl:max-w-[100vw]',
							'snap-start',
							'transition-[opacity,filter] ease-in-out',
							k === activeIdx
								? 'duration-800 delay-400'
								: 'duration-500',
							spaceRef.current.carouselItem,
							settings?.children?.className,
							{
								'z-1': k === activeIdx,
								'opacity-80 blur-xs':
									k - 1 === activeIdx || k + 1 === activeIdx,
								'opacity-50 blur-sm':
									k !== activeIdx &&
									(k - 1 < activeIdx || k + 1 > activeIdx),
							},
						])}>
						{cloneElement(template, {
							slideId: k,
							className: 'w-full md:min-w-70',
						})}
					</div>
				))}
				<div className='hidden sm:block shrink-0 w-full snap-none' />
			</div>
			<Nav
				containerRef={containerRef}
				itemRefs={itemRefs}
				activeIdx={activeIdx}
				setActiveIdx={setActiveIdx}
				totalSlides={content.length}
			/>
		</div>
	);
};
export default Carousel;
