import { CSSProperties } from 'react';
import { useSection } from '@/contexts/section';
import { colorToRgb } from '@/utils/colors';
import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';
import Pager from './elements/Pager';
import Polygons from './elements/Polygons';

interface SectionProps {
	sectionId: number;
	isFirst: boolean;
	isLast: boolean;
	className?: string;
}

const Section = ({
	sectionId,
	isFirst,
	isLast,
	className = '',
}: SectionProps) => {
	const { theme, setSectionRef, nextBackgroundColor, hasImage } =
		useSection();
	const { setSectionRefs, sectionRefs } = useSettings();

	return (
		<section
			ref={(node) => {
				setSectionRef(node);
				setSectionRefs(sectionId, node);
			}}
			data-id={sectionId}
			data-theme={theme}
			className={classNames([
				'flex items-stretch min-h-full relative bg-(--color-background) text-(--color-heading)',
				className,
			])}
			style={
				{
					'--color-next-background': `rgb(${colorToRgb(
						nextBackgroundColor
					)})`,
				} as CSSProperties
			}>
			{Object.keys(sectionRefs.current).length > 0 && (
				<Pager
					isFirst={isFirst}
					isLast={isLast}
				/>
			)}
			<Title />
			{!isLast && <Pattern />}
			{!hasImage && !isFirst && !isLast && (
				<Polygons
					mode='repel'
					min={1}
					max={1}
					ratio={10}
					margin={-10}
				/>
			)}
			<picture className='absolute top-0 bottom-0 left-0 right-0 p-20'>
				{/* <source
					type='image/avif'
					srcSet='
      /images/head-800.avif 800w,
      /images/head-1200.avif 1200w,
      /images/head-1600.avif 1600w,
      /images/head-2160.avif 2160w
    '
					sizes='100vw'
				/>
				<source
					type='image/webp'
					srcSet='
      /images/head-800.webp 800w,
      /images/head-1200.webp 1200w,
      /images/head-1600.webp 1600w,
      /images/head-2160.webp 2160w
    '
					sizes='100vw'
				/> */}
				<img
					src='/images/marco-d-cellamare.png'
					loading='lazy'
					decoding='async'
					className='w-full h-full object-contain'
				/>
			</picture>
			<Templates />
		</section>
	);
};
export default Section;
