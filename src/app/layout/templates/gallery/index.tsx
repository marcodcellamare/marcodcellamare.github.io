import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import { useSection } from '@/contexts/section';
import classNames from 'classnames';

import Picture from '@/app/misc/picture';

interface GalleryProps {
	className?: string;
}

const Gallery = ({ className }: GalleryProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();

	const rootKey = `sections.${sectionId}.images`;
	const imagesExists = i18n.exists(rootKey, {
		ns: pageId,
	});

	const gap = 'gap-5 md:gap-10 xl:gap-15';

	if (!imagesExists) return null;

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
					<Picture
						src={t(`${rootKey}.0`)}
						className='rounded-md'
					/>
				</div>
				<div
					className={classNames([
						'flex flex-col flex-1 items-center',
						gap,
					])}>
					<Picture
						src={t(`${rootKey}.1`)}
						className='rounded-md'
					/>
					<Picture
						src={t(`${rootKey}.2`)}
						className='rounded-md'
					/>
				</div>
			</div>
			<div className='flex sm:basis-2/5 lg:basis-1/2'>
				<div
					className={classNames([
						'grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 flex-1 h-fit items-center justify-items-center',
						gap,
					])}>
					<div />
					<Picture
						src='/images/marco-d-cellamare-full.jpg'
						className='rounded-md'
					/>
					<div />
					<Picture
						src='/images/marco-d-cellamare-full.jpg'
						className='rounded-md'
					/>
					<Picture
						src='/images/marco-d-cellamare-full.jpg'
						className='rounded-md'
					/>
					<Picture
						src='/images/marco-d-cellamare-full.jpg'
						className='rounded-md'
					/>
				</div>
			</div>
		</div>
	);
};
export default Gallery;
