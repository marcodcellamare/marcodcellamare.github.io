import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import Blob from '!/app/misc/Blob';
import Duotone from '!/app/misc/Duotone';
import { useState } from 'react';

interface ImageProps {
	rootKey: string;
	className?: string;
}

const Image = ({ rootKey, className = '' }: ImageProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const [isOver, setIsOver] = useState(false);

	const imageExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const id = uuidv4();
	const blob =
		(t(`${rootKey}.blob`, {
			returnObjects: true,
		}) as unknown as boolean) === true;

	if (!imageExists) return null;

	return (
		<div
			className={classNames([
				'image relative max-w-fit max-h-80 lg:max-h-none transition-[scale] duration-200 ease-in-out',
				!isOver ? 'scale-190' : 'scale-195 z-1',
				className,
			])}>
			{blob && (
				<Blob
					mask={`mask.${id}`}
					speed={!isOver ? 0.001 : 0.007}
					numPoints={8}
					className='absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none'
				/>
			)}
			<Duotone
				id={`duotone.${id}`}
				bgColor={[225, 232, 230]}
				fgColor={[255, 255, 255]}
			/>
			<div
				className='relative h-full'
				onPointerEnter={() => setIsOver(true)}
				onPointerLeave={() => setIsOver(false)}>
				<img
					src={t(`${rootKey}.src`)}
					className={classNames([
						'h-full max-h-full pointer-events-none',
					])}
					style={{
						clipPath: blob ? `url(#mask.${id})` : undefined,
						filter: `url(#duotone.${id})`,
					}}
				/>
				<img
					src={t(`${rootKey}.src`)}
					className={classNames([
						'absolute top-0 bottom-0 left-0 right-0 h-full pointer-events-none transition-opacity duration-400 ease-in-out',
						!isOver ? 'opacity-0' : 'opacity-100 delay-100',
					])}
					style={{
						clipPath: blob ? `url(#mask.${id})` : undefined,
					}}
				/>
			</div>
		</div>
	);
};
export default Image;
