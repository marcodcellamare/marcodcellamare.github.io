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
							'@3xl:scale-115',
							'min-w-50 max-w-[33vw]',
							'@3xl:max-w-none',
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
							'flex-1 hover:drop-shadow-2xl/30',
							'transition-[scale,filter] duration-200 ease-in-out',
							'min-w-60 max-w-2/3 @lg:max-w-1/2',
							'-translate-x-1/5 @3xl:translate-x-0',
							'@3xl:max-w-none',
							!image.blob
								? [
										'rounded-sm overflow-hidden',
										'scale-100 hover:scale-105',
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
										'scale-170 hover:scale-175',
										'@md:scale-155 @md:hover:scale-160',
										{
											'@3xl:origin-[55%_center]':
												!image.position ||
												image.position === 'left',
											'@3xl:origin-[45%_center]':
												image.position === 'right',
										},
								  ],
						])}
					/>
				)
			);
	}
};
export default ImageWrapper;
