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
import Background from './elements/Background';

interface SectionProps {
	sectionId: number;
	isFirst: boolean;
	isLast: boolean;
	className?: string;
}

const Section = ({ sectionId, isFirst, isLast, className }: SectionProps) => {
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
			<Background />
			<Title isFirst={isFirst} />
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
			<Templates />
		</section>
	);
};
export default Section;
