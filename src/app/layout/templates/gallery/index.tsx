import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import { useSection } from '@/contexts/section';
import useTranslationFallback from '@/hooks/useTranslationFallback';
import classNames from 'classnames';

import Cell from './Cell';

interface GalleryProps {
	className?: string;
	children?: ReactNode;
}

const Gallery = ({ className, children }: GalleryProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n } = useTranslation(pageId);
	const { sectionId } = useSection();

	const [images, setImages] = useState<string[]>([]);

	const rootKey = `sections.${sectionId}.images`;
	const imagesExists = i18n.exists(rootKey, {
		ns: pageId,
	});

	const rawImages = useTranslationFallback<string[]>(rootKey, [], pageId);
	const rawImagesRef = useRef(rawImages);

	useEffect(() => {
		if (rawImagesRef.current.length === 0) return;

		const totalToAdd = Math.round(rawImagesRef.current.length * 0.2);

		for (let i = 0; i < totalToAdd; i++) {
			const pos = Math.floor(
				Math.random() * (rawImagesRef.current.length + 1)
			);
			rawImagesRef.current.splice(pos, 0, '');
		}
		setImages(rawImagesRef.current as string[]);
	}, []);

	if (!imagesExists || images.length === 0) return null;

	return (
		<div
			className={classNames([
				'template-gallery grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 4xl:grid-cols-6 gap-5 md:gap-10',
				'flex-1 items-center justify-items-center !py-[calc(var(--main-h)*0.7)]',
				className,
			])}>
			{images.map((image, k) => (
				<Cell
					key={k}
					image={image as string}
				/>
			))}
			{children && (
				<div className='template-gallery-content absolute top-0 bottom-0 left-0 right-0 z-1'>
					{children}
				</div>
			)}
		</div>
	);
};
export default Gallery;
