import { lazy, Suspense, useState } from 'react';
import { useSection } from '@/contexts/section';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import { v4 as uuidv4 } from 'uuid';
import { colorToRgb } from '@/utils/colors';
import classNames from 'classnames';

import Duotone from '@/app/misc/Duotone';
import Picture from '@/app/misc/Picture';

const Blob = lazy(() => import('@/app/misc/Blob'));

interface ImageProps {
	rootKey: string;
	className?: string;
}

const Image = ({ rootKey, className }: ImageProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const { i18n, t } = useTranslation(pageId);
	const { duotoneColorBackground, duotoneColorForeground } = useSection();

	const [isOver, setIsOver] = useState(false);

	const imageExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const id = uuidv4();
	const isBlob =
		(t(`${rootKey}.blob`, {
			returnObjects: true,
		}) as unknown as boolean) === true;
	const isDuotone =
		(t(`${rootKey}.duotone`, {
			returnObjects: true,
		}) as unknown as boolean) === true;

	if (!imageExists) return null;

	return (
		<div
			className={classNames([
				'image relative pointer-events-auto',
				className,
			])}
			onPointerEnter={() => setIsOver(true)}
			onPointerLeave={() => setIsOver(false)}>
			{isBlob && (
				<Suspense fallback={null}>
					<Blob
						mask={`mask.${id}`}
						speed={!isOver ? 0.001 : 0.007}
						numPoints={8}
						className='absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none'
					/>
				</Suspense>
			)}
			{isDuotone && (
				<Duotone
					id={`duotone.${id}`}
					bgColor={colorToRgb(duotoneColorBackground)}
					fgColor={colorToRgb(duotoneColorForeground)}
				/>
			)}
			<div className='relative w-full h-full pointer-events-none'>
				<Picture
					src={t(`${rootKey}.src`)}
					style={{
						clipPath: isBlob ? `url(#mask.${id})` : undefined,
						filter: isDuotone ? `url(#duotone.${id})` : undefined,
					}}
				/>
				{isDuotone && (
					<Picture
						src={t(`${rootKey}.src`)}
						pictureClassName={classNames([
							'absolute top-0 bottom-0 left-0 right-0 h-full transition-opacity duration-400 ease-in-out',
							!isOver ? 'opacity-0' : 'opacity-100 delay-100',
						])}
						style={{
							clipPath: isBlob ? `url(#mask.${id})` : undefined,
						}}
					/>
				)}
			</div>
		</div>
	);
};
export default Image;
