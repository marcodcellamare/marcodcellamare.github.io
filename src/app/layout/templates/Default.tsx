import { useSection } from '@/contexts/section';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import { useParallax } from '@/contexts/parallax';
import { useDevUtilities } from '@/contexts/dev-utilities';
import { easeInOut, motion, useScroll, useTransform } from 'motion/react';
import classNames from 'classnames';

import Content from '@/app/layout/elements/content';
import Image from '@/app/layout/elements/Image';
import Floating from '@/app/misc/Floating';
import AnimatedIcon from '@/app/layout/elements/animated-icon';

interface DefaultProps {
	slideId?: number;
	activeIdx?: number;
	className?: string;
}

const Default = ({
	slideId = 0,
	activeIdx = 0,
	className = '',
}: DefaultProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { DevBreakpoints } = useDevUtilities();

	const rootKey = `sections.${sectionId}.content.${slideId}`;
	const imageExists = i18n.exists(`${rootKey}.image.src`, {
		ns: pageId,
	});
	const iconExists = i18n.exists(`${rootKey}.image.icon`, {
		ns: pageId,
	});

	const position = t(`${rootKey}.image.position`, 'left') as 'left' | 'right';
	const isBlob = t(`${rootKey}.image.blob`, {
		returnObjects: true,
		defaultValue: false,
	}) as unknown as boolean;

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
				{imageExists ||
					(iconExists && (
						<motion.div
							className={classNames([
								'flex flex-1 min-w-0',
								'transition-opacity duration-300 delay-150',
								{
									'@3xl:justify-end': position === 'left',
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
								{imageExists && (
									<Image
										rootKey={`${rootKey}.image`}
										className={classNames([
											'z-0 hover:z-2 hover:drop-shadow-2xl/30',
											'transition-[scale,filter] duration-200 ease-in-out',
											'max-w-80',
											'@3xl:max-w-none',
											!isBlob
												? [
														'rounded-sm overflow-hidden',
														'scale-120 hover:scale-125',
														'@md:scale-130 @md:hover:scale-135',
														'@3xl:scale-140 @3xl:hover:scale-145',
														'@4xl:scale-120 @4xl:hover:scale-120',
														'origin-bottom-left',
														{
															'@3xl:origin-right':
																position ===
																'left',
															'@3xl:origin-left':
																position ===
																'right',
														},
												  ]
												: [
														'scale-140 hover:scale-145',
														'@md:scale-150 @md:hover:scale-155',
														'@3xl:scale-160 @3xl:hover:scale-165',
												  ],
										])}
									/>
								)}
								{iconExists && (
									<AnimatedIcon
										rootKey={`${rootKey}.image.icon`}
										className={classNames([
											'flex flex-1 text-(--color-link)',
											'scale-150',
											'@md:scale-170',
											'@3xl:scale-250',
											'@5xl:scale-210',
											'max-w-60',
											'@3xl:max-w-none',
										])}
									/>
								)}
							</Floating>
						</motion.div>
					))}
				<Floating
					mode='repel'
					ratioY={40}
					duration={0.5}
					className={classNames([
						'shrink-0 min-w-30 z-1',
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
