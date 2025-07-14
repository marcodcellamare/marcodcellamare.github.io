import { useSection } from '!/contexts/section';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';
import { useDevUtilities } from '!/contexts/dev-utilities';
import { easeInOut, motion, useScroll, useTransform } from 'motion/react';
import classNames from 'classnames';

import Content from '!/app/layout/elements/content';
import Image from '!/app/layout/elements/Image';

interface DefaultProps {
	slideId?: number;
	className?: string;
}

const Default = ({ slideId = 0, className = '' }: DefaultProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { DevBreakpoints } = useDevUtilities();

	const rootKey = `sections.${sectionId}.content.${slideId}`;
	const imageExists = i18n.exists(`${rootKey}.image`, {
		ns: pageId,
	});

	const position = t(`${rootKey}.image.position`, 'left') as 'left' | 'right';
	const isBlob = t(`${rootKey}.image.blob`, {
		returnObjects: true,
		defaultValue: false,
	}) as unknown as boolean;

	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));
	const y = useTransform(scrollYProgress, [0, 1], ['25rem', '-25rem'], {
		ease: easeInOut,
	});
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1], {
		ease: easeInOut,
	});

	return (
		<div className={classNames('@container relative', className)}>
			<DevBreakpoints subContainer={true} />
			<div className='flex flex-1 flex-col @2xl:flex-row @2xl:items-center gap-5 @2xl:gap-7 @3xl:gap-10'>
				{imageExists && (
					<motion.div
						className={classNames([
							'flex flex-1 min-w-0',
							{
								'@2xl:justify-end': position === 'left',
								'@2xl:justify-start @2xl:order-last':
									position === 'right',
							},
						])}
						style={{ y, scale }}>
						<Image
							rootKey={`${rootKey}.image`}
							className={classNames([
								'z-0 hover:z-2 hover:drop-shadow-2xl/30',
								'transition-[scale,filter] duration-200 ease-in-out',
								'max-w-80',
								'@2xl:max-w-none',
								!isBlob
									? [
											'rounded-sm overflow-hidden',
											'scale-120 hover:scale-125',
											'@md:scale-130 @md:hover:scale-135',
											'@2xl:scale-140 @2xl:hover:scale-145',
											'@3xl:scale-120 @3xl:hover:scale-120',
											'origin-bottom-left',
											{
												'@2xl:origin-right':
													position === 'left',
												'@2xl:origin-left':
													position === 'right',
											},
									  ]
									: [
											'scale-140 hover:scale-145',
											'@md:scale-150 @md:hover:scale-155',
											'@3xl:scale-160 @3xl:hover:scale-165',
									  ],
							])}
						/>
					</motion.div>
				)}
				<Content
					rootKey={rootKey}
					className={classNames([
						'shrink-0 min-w-30 z-1',
						!imageExists
							? '@2xl:basis-9/12 @6xl:basis-7/12'
							: '@2xl:basis-6/12 @3xl:basis-7/12',
					])}
				/>
			</div>
		</div>
	);
};
export default Default;
