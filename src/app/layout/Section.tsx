import { CSSProperties } from 'react';
import { useSettings } from '!/contexts/settings';
import { useSection } from '!/contexts/section';
import { colorToRgb } from '!/utils/colors';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';

interface SectionProps {
	className?: string;
}

const Section = ({ className = '' }: SectionProps) => {
	const { spaceRef } = useSettings();
	const { theme, setSectionRef, nextBackgroundColor } = useSection();

	return (
		<section
			ref={setSectionRef}
			data-theme={theme}
			className={classNames([
				'flex items-center min-h-full relative bg-[var(--color-background)] text-[var(--color-heading)]',
				spaceRef.current.section,
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
		</section>
	);
};
export default Section;
