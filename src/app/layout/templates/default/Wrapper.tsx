import { useUIStore } from '@/stores/useUIStore';
import { ImageIconType, ImageInterface } from '@/types/layout';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import AnimatedIcon from '@/app/layout/elements/AnimatedIcon';
import Image from '@/app/layout/elements/Image';

interface WrapperProps {
	rootKey: string;
}

const Wrapper = ({ rootKey }: WrapperProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const image = useTranslationFallback<ImageInterface>(rootKey, {}, pageId);

	if (!image.src) return null;

	const icon = image.src?.startsWith('icon:');

	if (icon) {
		return (
			<AnimatedIcon
				icon={image.src as ImageIconType}
				className={classNames([
					'flex flex-1 text-(--color-theme-link)',
					'scale-150',
					'@3xl:scale-115',
					'min-w-50 max-w-1/3',
					'@3xl:max-w-none',
				])}
			/>
		);
	} else {
		return (
			<Image
				rootKey={rootKey}
				className={classNames([
					'flex-1',
					'transition-[filter] duration-200 ease-in-out',
					'min-w-60 max-w-2/3 @lg:max-w-1/2',
					'-translate-x-1/5 @3xl:translate-x-0',
					'@3xl:max-w-none',
					!image.blob
						? [
								'rounded-md overflow-hidden',
								'scale-100',
								'@3xl:scale-140',
								'@4xl:scale-120',
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
								'scale-170',
								'@md:scale-155',
								'origin-[center_80%]',
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
		);
	}
};
export default Wrapper;
