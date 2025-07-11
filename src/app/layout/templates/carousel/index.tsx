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
	children?: ReactElement<{ activeIdx: number; totalSlides: number }>;
}

const Carousel = ({ template, className = '', children }: CarouselProps) => {
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
			{/* {children &&
				cloneElement(children, {
					activeIdx,
					totalSlides: content.length,
				})} */}

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
							'box-content shrink-0 text-9xl',
							'w-full',
							'min-w-[min(100vw,10rem)]',
							'2xl:min-w-[35rem]',
							'3xl:min-w-[40rem]',
							'max-w-[calc(100vw-(var(--spacing)*(5+5)))]',
							'sm:max-w-[calc(100vw-max((100vw-var(--breakpoint-sm)),0rem)-(var(--spacing)*(5+5)))]',
							'md:max-w-[calc(100vw-max((100vw-var(--breakpoint-md)),0rem)-(var(--spacing)*(10+5)))]',
							'lg:max-w-[calc(100vw-max((100vw-var(--breakpoint-lg)),0rem)-(var(--spacing)*(20+5)))]',
							'xl:max-w-[calc(100vw-max((100vw-var(--breakpoint-xl)),0rem)-(var(--spacing)*(30+5)))]',
							'2xl:max-w-[calc(100vw-max((100vw-var(--breakpoint-2xl)),0rem)-(var(--spacing)*(50+5)))]',
							'3xl:max-w-[calc(100vw-(var(--spacing)*(80+5)))]',
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
