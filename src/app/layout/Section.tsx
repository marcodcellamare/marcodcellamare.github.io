import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';
import { cssVariable } from '!/utils/misc';
import { colorToRgb } from '!/utils/colors';

import Container from './elements/Container';
import Content from './elements/Content';
import Pattern from './elements/Pattern';

import { RGB } from '!/types/misc';
import H0 from './elements/H0';

interface SectionProps {
	sectionId: number;
	className?: string;
}

const Section = ({ sectionId, className = '' }: SectionProps) => {
	const { sectionTheme, sectionTemplate } = useSettings();

	const [nextBaseColor, setNextBaseColor] = useState<RGB | null>(null);

	const targetRef = useRef<HTMLDivElement>(null);

	useEffect(
		() =>
			setNextBaseColor(
				colorToRgb(
					cssVariable(
						'--color-base-200',
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
				'flex items-center min-h-full relative overflow-hidden bg-base-200 text-base-content',
				className,
			])}
			style={
				nextBaseColor
					? ({
							'--next-base-color': nextBaseColor,
					  } as CSSProperties)
					: undefined
			}>
			<H0
				sectionId={sectionId}
				targetRef={targetRef}
			/>
			<Container className='flex flex-col gap-5 lg:flex-row py-20'>
				{sectionTemplate(sectionId) !== 'full' ? (
					<div
						className={classNames([
							'lg:basis-2/5 border',
							{
								'order-last':
									sectionTemplate(sectionId) === 'left',
							},
						])}>
						IMAGE
					</div>
				) : null}
				<Content
					sectionId={sectionId}
					className={classNames(
						sectionTemplate(sectionId) === 'full'
							? 'lg:basis-9/12'
							: 'lg:basis-3/5'
					)}
				/>
			</Container>
			<Pattern targetRef={targetRef} />
		</section>
	);
};
export default Section;
