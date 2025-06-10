import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings';
import { cssVariable } from '!/utils/misc';
import { colorToRgb } from '!/utils/colors';
import classNames from 'classnames';

import Pattern from './elements/Pattern';
import Title from './elements/Title';
import Templates from './templates';

import { RGB } from '!/types/misc';
import { useSection } from '!/contexts/section';

interface SectionProps {
	className?: string;
}

const Section = ({ className = '' }: SectionProps) => {
	const { sectionTheme } = useSettings();
	const { sectionId, theme } = useSection();

	const [nextBaseColor, setNextBaseColor] = useState<RGB | null>(null);

	const targetRef = useRef<HTMLDivElement>(null);

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
			<Title targetRef={targetRef} />
			<Pattern targetRef={targetRef} />
			<Templates />
			{/*
			<Container className='flex flex-col gap-10 lg:gap-15 md:flex-row py-20'>
				{['text:left', 'text:right'].includes(template) ? (
					<div
						className={classNames([
							'md:basis-4/9 lg:basis-2/5 min-w-0',
							{
								'order-first': template === 'text:left',
							},
						])}>
						<div className='w-full aspect-square border'>IMAGE</div>
					</div>
				) : null}
				<TextBlock
					sectionId={sectionId}
					className={classNames([
						'min-w-0',
						template === 'text:full'
							? 'md:basis-9/12'
							: 'md:basis-5/9 lg:basis-3/5',
					])}
				/>
			</Container>
			*/}
		</section>
	);
};
export default Section;
