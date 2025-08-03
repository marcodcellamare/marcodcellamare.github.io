import { CSSProperties } from 'react';
import { useSection } from '@/contexts/section';
import { colorToRgb } from '@/utils/colors';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';
import Pager from './elements/Pager';
import Polygons from './elements/Polygons';
import Background from './elements/Background';
import Container from './elements/Container';

interface SectionProps {
	isFirst: boolean;
	isLast: boolean;
	className?: string;
}

const Section = ({ isFirst, isLast, className }: SectionProps) => {
	const spacing = useUIStore((state) => state.spacing);
	const { setSectionRefs, sectionRefs, areAllSectionRefsReady } =
		useUIStore();
	const { sectionId, theme, setSectionRef, nextBackgroundColor, hasImage } =
		useSection();

	return (
		<section
			ref={(node) => {
				setSectionRef(node);
				setSectionRefs(sectionId, node);
			}}
			data-id={sectionId}
			data-theme={theme}
			className={classNames([
				'flex items-stretch min-h-full relative bg-(--color-theme-background) text-(--color-theme-content)',
				className,
			])}
			style={
				{
					'--color-theme-next-background': `rgb(${colorToRgb(
						nextBackgroundColor
					)})`,
				} as CSSProperties
			}>
			<Background />
			<Container
				className={classNames([
					'absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
					spacing.container,
				])}>
				{areAllSectionRefsReady() &&
					Object.keys(sectionRefs.current).length > 0 && (
						<Pager
							isFirst={isFirst}
							isLast={isLast}
						/>
					)}
			</Container>
			<Title isFirst={isFirst} />
			{!isLast && <Pattern />}
			{!hasImage && !isFirst && !isLast && (
				<Polygons
					mode='repel'
					min={1}
					max={3}
					ratio={10}
					margin={-10}
				/>
			)}
			<Templates />
		</section>
	);
};
export default Section;
