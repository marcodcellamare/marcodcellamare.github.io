import { CSSProperties } from 'react';
import { useSection } from '!/contexts/section';
import { colorToRgb } from '!/utils/colors';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';
import Pager from './elements/Pager';
import Polygon from '!/app/misc/Polygon';

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
			<Polygon
				fill={`rgb(${colorToRgb(nextBackgroundColor)})`}
				className='absolute -top-1/4 -left-1/4 w-1/2'
			/>
			<Polygon
				fill={`rgb(${colorToRgb(nextBackgroundColor)})`}
				className='absolute top-3/5 left-3/5 w-1/2'
			/>
			<Title />
			<Pattern />
			<Pager />
			<Templates />
		</section>
	);
};
export default Section;
