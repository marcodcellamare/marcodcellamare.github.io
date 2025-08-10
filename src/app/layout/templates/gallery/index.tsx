import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import { useSection } from '@/contexts/section';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import Image from './Image';

import { ImageType } from '@/types/layout';

interface GalleryProps {
	className?: string;
}

const Gallery = ({ className }: GalleryProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);
	const { sectionId } = useSection();

	const rootKey = `sections.${sectionId}.images`;
	const imagesExists = i18n.exists(rootKey, {
		ns: pageId,
	});

	const images = useTranslationFallback<ImageType[]>(rootKey, [], pageId);

	const gap = 'gap-5 md:gap-10 xl:gap-15';

	if (!imagesExists || images.length === 0) return null;

	return (
		<div
			className={classNames([
				'gallery flex flex-col sm:flex-row items-center justify-center',
				gap,
				className,
			])}>
			<div
				className={classNames(['flex sm:basis-3/5 lg:basis-1/2', gap])}>
				<div className='flex basis-1/2 lg:basis-7/12 items-center'>
					{images[0] && <Image src={images[0]} />}
				</div>
				<div
					className={classNames([
						'flex flex-col flex-1 items-center',
						gap,
					])}>
					{Array.from({ length: 2 }).map((_, k) => {
						const kk = k + 1;

						return images[kk] ? (
							<Image src={images[kk]} />
						) : (
							<div />
						);
					})}
				</div>
			</div>
			<div className='flex sm:basis-2/5 lg:basis-1/2'>
				<div
					className={classNames([
						'grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 flex-1 h-fit items-center justify-items-center',
						gap,
					])}>
					{Array.from({ length: 6 }).map((_, k) => {
						const kk = k + 3;

						return images[kk] ? (
							<Image src={images[kk]} />
						) : (
							<div />
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default Gallery;
