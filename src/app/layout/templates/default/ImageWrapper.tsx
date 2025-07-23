import { useRouter } from '@/contexts/router';
import { ImageInterface } from '@/types/layout';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import AnimatedIcon from '@/app/layout/elements/animated-icon';
import Image from '@/app/layout/elements/Image';

interface DefaultProps {
	rootKey: string;
}

const ImageWrapper = ({ rootKey }: DefaultProps) => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);

	const image = t(`${rootKey}`, {
		returnObjects: true,
		defaultValue: {},
	}) as unknown as ImageInterface;

	switch (image.src) {
		case 'ICON':
			return (
				image.icon && (
					<AnimatedIcon
						icon={image.icon}
						className={classNames([
							'flex flex-1 text-(--color-link)',
							'scale-150',
							'@md:scale-170',
							'@3xl:scale-250',
							'@5xl:scale-210',
							'max-w-60',
							'@4xl:max-w-70',
						])}
					/>
				)
			);

		default:
			return (
				image.src && (
					<Image
						rootKey={rootKey}
						className={classNames([
							'flex-1 z-0 hover:z-2 hover:drop-shadow-2xl/30',
							'transition-[scale,filter] duration-200 ease-in-out',
							'max-w-80',
							'@3xl:max-w-none',
							!image.blob
								? [
										'rounded-sm overflow-hidden',
										'scale-120 hover:scale-125',
										'@md:scale-130 @md:hover:scale-135',
										'@3xl:scale-140 @3xl:hover:scale-145',
										'@4xl:scale-120 @4xl:hover:scale-120',
										'origin-bottom-left',
										{
											'@3xl:origin-right':
												!image.position ||
												image.position === 'left',
											'@3xl:origin-left':
												image.position === 'right',
										},
								  ]
								: [
										'scale-140 hover:scale-145',
										'@md:scale-150 @md:hover:scale-155',
										'@3xl:scale-160 @3xl:hover:scale-165',
								  ],
						])}
					/>
				)
			);
	}

	/* 
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

	const position = t(
		`${rootKey}.image.position`,
		'left'
	) as ImagePositionType;
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
	}); */

	return <div>xxxx</div>;
};
export default ImageWrapper;
