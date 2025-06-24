import { cloneElement, ReactElement, useRef, useState } from 'react';
import { useSection } from '!/contexts/section';
import { useRouter } from '!/contexts/router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Nav from './Nav';

interface CarouselProps {
	template: ReactElement<{ slideId: number }>;
	className?: string;
	children: ReactElement<{ activeIdx: number; totalSlides: number }>;
}

const Carousel = ({ template, className = '', children }: CarouselProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId } = useSection();

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
	}) as any[];

	if (!contentExists) return null;

	return (
		<div className='carousel-wrapper flex relative w-full'>
			{cloneElement(children, { activeIdx, totalSlides: content.length })}
			<div
				ref={containerRef}
				className={classNames([
					'carousel min-h-20 w-full relative pointer-events-none',
					className,
				])}>
				{content.map((_, k) => (
					<div
						key={k}
						ref={(ref) => {
							itemRefs.current[k] = ref;
						}}
						className={classNames([
							'carousel-item w-full transition-opacity duration-500 ease-in-out',
							{
								'opacity-0 pointer-events-none':
									activeIdx !== k,
							},
						])}>
						{cloneElement(template, { slideId: k })}
					</div>
				))}
			</div>
			<Nav
				itemRefs={itemRefs}
				activeIdx={activeIdx}
				setActiveIdx={setActiveIdx}
				totalSlides={content.length}
			/>
		</div>
	);
};
export default Carousel;
