import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings';
import { useSection } from '!/contexts/section';
import { cssVariable } from '!/utils/misc';
import { colorToRgb } from '!/utils/colors';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';

import { RGB } from '!/types/misc';

interface SectionProps {
	className?: string;
}

const Section = ({ className = '' }: SectionProps) => {
	const { sectionTheme } = useSettings();
	const { sectionId, theme, setSectionRef } = useSection();

	const [nextBaseColor, setNextBaseColor] = useState<RGB | null>(null);

	useEffect(
		() =>
			setNextBaseColor(
				colorToRgb(
					cssVariable(
						'--color-background',
						`[data-theme="${sectionTheme(sectionId + 1)}"]`
					)
				)
			),
		[sectionId, sectionTheme]
	);

	return (
		<section
			ref={setSectionRef}
			data-theme={theme}
			className={classNames([
				'flex items-center min-h-full relative overflow-hidden bg-[var(--color-background)] text-[var(--color-heading)]',
				className,
			])}
			style={
				nextBaseColor
					? ({
							'--color-next-background': `rgb(${nextBaseColor})`,
					  } as CSSProperties)
					: undefined
			}>
			<Pattern />
			<Title />
			<Templates />
		</section>
	);
};
export default Section;
