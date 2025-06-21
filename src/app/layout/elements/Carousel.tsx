import { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import { useSection } from '!/contexts/section';
import { useRouter } from '!/contexts/router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { ChevronRightIcon } from 'lucide-react';

interface CarouselProps {
	className?: string;
	children: ReactElement<{ slideId: number }>;
}

const Carousel = ({ className = '', children }: CarouselProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId } = useSection();

	const [activeIndex, setActiveIndex] = useState(0);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
	const isManualScroll = useRef(false);

	const rootKey = `sections.${sectionId}.content`;

	const contentExists = i18n.exists(`${rootKey}`, {
		ns: pageId,
	});
	const content = t(`${rootKey}`, {
		returnObjects: true,
		defaultValue: [],
	}) as any[];

	const handleNext = () => {
		isManualScroll.current = false;
		setActiveIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1));
	};

	useEffect(() => {
		if (!isManualScroll.current)
			itemRefs.current[activeIndex]?.scrollIntoView({
				behavior: 'smooth',
			});
	}, [activeIndex]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			/*
			isManualScroll.current = true;

			const containerScrollLeft = container.scrollLeft;
			let closestIndex = 0;
			let closestDistance = Infinity;

			itemRefs.current.forEach((item, index) => {
				if (item) {
					const itemLeft = item.offsetLeft;
					const distance = Math.abs(containerScrollLeft - itemLeft);

					if (distance < closestDistance) {
						closestDistance = distance;
						closestIndex = index;
					}
				}
			});

			setActiveIndex(closestIndex);
			*/
			console.log('xxx');
		};
		container.addEventListener('scroll', handleScroll, { passive: true });
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	if (!contentExists) return null;

	return (
		<div className='carousel-wrapper relative'>
			<div
				ref={containerRef}
				className={classNames(['carousel min-h-20 w-full', className])}>
				{content.map((_, k) => (
					<div
						key={k}
						ref={(ref) => {
							itemRefs.current[k] = ref;
						}}
						className='carousel-item w-full'>
						{cloneElement(children, { slideId: k })}
					</div>
				))}
			</div>
			{content.length > 0 && (
				<div className='absolute top-1/2 right-10 -translate-y-1/2 z-100 flex flex-col items-center mix-blend-difference'>
					<button
						type='button'
						role='button'
						aria-label={t('default:next')}
						className='carousel-nav text-8xl text-[var(--color-palette-gray)] hover:text-[var(--color-palette-dark-gray)]'
						onClick={handleNext}>
						<ChevronRightIcon className='text-svg-inline' />
					</button>
					<div className='carousel-position text-xs font-bold text-[var(--color-palette-gray)] absolute top-full'>
						{activeIndex + 1} / {content.length}
					</div>
				</div>
			)}
		</div>
	);
};
export default Carousel;
