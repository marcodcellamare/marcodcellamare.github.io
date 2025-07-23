import { useSection } from '@/contexts/section';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import { useParallax } from '@/contexts/parallax';
import { useDevUtilities } from '@/contexts/dev-utilities';
import { easeInOut, motion, useScroll, useTransform } from 'motion/react';
import classNames from 'classnames';

import Content from '@/app/layout/elements/content';
import Floating from '@/app/misc/Floating';

import { ImagePositionType } from '@/types/layout';
import ImageWrapper from './ImageWrapper';

interface DefaultProps {
	slideId?: number;
	activeIdx?: number;
	className?: string;
}

const Default = ({ slideId = 0, activeIdx = 0, className }: DefaultProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { DevBreakpoints } = useDevUtilities();

	const rootKey = `sections.${sectionId}.content.${slideId}`;
	const imageExists = i18n.exists(`${rootKey}.image.src`, {
		ns: pageId,
	});
	const position = t(`${rootKey}.image.position`) as ImagePositionType;

	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));
	const y = useTransform(scrollYProgress, [0, 1], ['-3rem', '3rem'], {
		ease: easeInOut,
	});
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.8], {
		ease: easeInOut,
	});

	return (
		<div className={classNames('@container relative', className)}>
			<DevBreakpoints subContainer={true} />
			<div className='flex flex-1 flex-col @3xl:flex-row @3xl:items-center gap-8 @3xl:gap-12 @5xl:gap-17'>
				{imageExists && (
					<motion.div
						className={classNames([
							'flex flex-1 min-w-0',
							'transition-opacity duration-300 delay-150',
							{
								'@3xl:justify-end':
									!position || position === 'left',
								'@3xl:justify-start @3xl:order-last':
									position === 'right',
								'opacity-0': slideId !== activeIdx,
							},
						])}
						style={{ y, scale }}>
						<Floating
							mode='attract'
							ratioX={50}
							ratioY={15}
							duration={1}
							className='flex flex-1'>
							<ImageWrapper rootKey={`${rootKey}.image`} />
						</Floating>
					</motion.div>
				)}
				<Floating
					mode='repel'
					ratioY={40}
					duration={0.5}
					className={classNames([
						'shrink-0 min-w-30',
						!imageExists
							? '@3xl:basis-9/12 @6xl:basis-7/12'
							: '@3xl:basis-6/12 @4xl:basis-7/12',
					])}>
					<Content rootKey={rootKey} />
				</Floating>
			</div>
		</div>
	);
};
export default Default;
