import { useState } from 'react';
import { useSection } from '!/contexts/section';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { v4 as uuidv4 } from 'uuid';
import { colorToRgb } from '!/utils/colors';
import classNames from 'classnames';

import Blob from '!/app/misc/Blob';
import Duotone from '!/app/misc/Duotone';

interface ImageProps {
	rootKey: string;
	className?: string;
}

const Image = ({ rootKey, className = '' }: ImageProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { duotoneColorBackground, duotoneColorForeground } = useSection();

	const [isOver, setIsOver] = useState(false);

	const imageExists = i18n.exists(rootKey, {
		ns: pageId,
	});
	const id = uuidv4();
	const blob =
		(t(`${rootKey}.blob`, {
			returnObjects: true,
		}) as unknown as boolean) === true;
	const duotone =
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
			{blob && (
				<Blob
					mask={`mask.${id}`}
					speed={!isOver ? 0.001 : 0.007}
					numPoints={8}
					className='absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none'
				/>
			)}
			{duotone && (
				<Duotone
					id={`duotone.${id}`}
					bgColor={colorToRgb(duotoneColorBackground)}
					fgColor={colorToRgb(duotoneColorForeground)}
				/>
			)}
			<div className='relative w-full h-full pointer-events-none'>
				<img
					src={t(`${rootKey}.src`)}
					className='h-full max-h-full'
					style={{
						clipPath: blob ? `url(#mask.${id})` : undefined,
						filter: duotone ? `url(#duotone.${id})` : undefined,
					}}
				/>
				{duotone && (
					<img
						src={t(`${rootKey}.src`)}
						className={classNames([
							'absolute top-0 bottom-0 left-0 right-0 h-full transition-opacity duration-400 ease-in-out',
							!isOver ? 'opacity-0' : 'opacity-100 delay-100',
						])}
						style={{
							clipPath: blob ? `url(#mask.${id})` : undefined,
						}}
					/>
				)}
			</div>
		</div>
	);
};
export default Image;
