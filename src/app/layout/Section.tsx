import { CSSProperties } from 'react';
import { useSection } from '!/contexts/section';
import { colorToRgb } from '!/utils/colors';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';
import Pager from './elements/Pager';
import Polygons from './elements/Polygons';

interface SectionProps {
	sectionId: number;
	className?: string;
}

const Section = ({ sectionId, className = '' }: SectionProps) => {
	const { theme, setSectionRef, nextBackgroundColor } = useSection();
	const { setSectionRefs } = useSettings();

	return (
		<section
			ref={(node) => {
				setSectionRef(node);
				setSectionRefs(sectionId, node);
			}}
			data-id={sectionId}
			data-theme={theme}
			className={classNames([
				'flex items-stretch min-h-full relative bg-[var(--color-background)] text-[var(--color-heading)]',
				className,
			])}
			style={
				{
					'--color-next-background': `rgb(${colorToRgb(
						nextBackgroundColor
					)})`,
				} as CSSProperties
			}>
			<Title />
			<Pattern />
			<Pager />
			<Polygons
				min={1}
				max={1}
			/>
			<div className='absolute top-0 bottom-0 left-0 right-0 hidden sm:block sm:m-15 md:m-25 xl:m-40 pointer-events-none border-[0.1rem] border-[var(--color-next-background)]' />
			<Templates />
		</section>
	);
};
export default Section;
