import { CSSProperties } from 'react';
import { useSection } from '!/contexts/section';
import { colorToRgb } from '!/utils/colors';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';
import { useSettings } from '!/contexts/settings';

interface SectionProps {
	sectionId: number;
	className?: string;
}

const Section = ({ sectionId, className = '' }: SectionProps) => {
	const { theme, setSectionRef, nextBackgroundColor } = useSection();
	const { setSectionRefs, activeSectionId, activeSectionTheme } =
		useSettings();

	return (
		<section
			ref={(node) => {
				setSectionRef(node);
				setSectionRefs(sectionId, node);
			}}
			data-id={sectionId}
			data-theme={theme}
			className={classNames([
				'flex items-center min-h-full relative bg-[var(--color-background)] text-[var(--color-heading)]',
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
			<Templates />
			<div className='absolute top-1/2 left-5 -tranlate-y-1/2 border text-2xl'>
				Current: {sectionId} / {theme}
				<br />
				Active: {activeSectionId} / {activeSectionTheme}
			</div>
		</section>
	);
};
export default Section;
