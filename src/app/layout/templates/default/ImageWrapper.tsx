import { useRouter } from '@/contexts/router';
import { ImageInterface } from '@/types/layout';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import AnimatedIcon from '@/app/layout/elements/animated-icon';
import Image from '@/app/layout/elements/Image';

interface DefaultProps {
	rootKey: string;
}

const ImageWrapper = ({ rootKey }: DefaultProps) => {
	const { pageId } = useRouter();

	const image = useTranslationFallback<ImageInterface>(rootKey, {}, pageId);

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
};
export default ImageWrapper;
