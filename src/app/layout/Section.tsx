import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';
import { cssVariable } from '!/utils/misc';
import { colorToRgb } from '!/utils/colors';

import Container from './elements/Container';
import TextBlock from './text-block';
import Pattern from './elements/Pattern';
import Title from './elements/Title';

import { RGB } from '!/types/misc';

interface SectionProps {
	sectionId: number;
	className?: string;
}

const Section = ({ sectionId, className = '' }: SectionProps) => {
	const { sectionTheme, sectionTemplate } = useSettings();

	const [nextBaseColor, setNextBaseColor] = useState<RGB | null>(null);

	const targetRef = useRef<HTMLDivElement>(null);

	const template = sectionTemplate(sectionId);

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
			ref={targetRef}
			data-theme={sectionTheme(sectionId)}
			className={classNames([
				'flex items-center min-h-full relative overflow-hidden bg-[var(--color-background)] text-[var(--color-heading)]',
				className,
			])}
			style={
				nextBaseColor
					? ({
							'--next-base-color': nextBaseColor,
					  } as CSSProperties)
					: undefined
			}>
			<Title
				sectionId={sectionId}
				targetRef={targetRef}
			/>
			<Pattern targetRef={targetRef} />
			<Container className='flex flex-col gap-5 lg:flex-row py-20'>
				{['left-content-image', 'right-content-image'].includes(
					template
				) ? (
					<div
						className={classNames([
							'lg:basis-2/5 border',
							{
								'order-last': template === 'left-content',
							},
						])}>
						IMAGE
					</div>
				) : null}
				<TextBlock
					sectionId={sectionId}
					className={classNames(
						template === 'full-content'
							? 'lg:basis-9/12'
							: 'lg:basis-3/5'
					)}
				/>
			</Container>
		</section>
	);
};
export default Section;
