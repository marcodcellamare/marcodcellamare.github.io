import { useMemo } from 'react';
import Image from './Image';

import classNames from 'classnames';

interface CellProps {
	image: string;
}

const Cell = ({ image }: CellProps) => {
	const hasSpan = useMemo(() => image && Math.random() < 0.6, [image]);
	const hasSpanDouble = useMemo(
		() => hasSpan && Math.random() < 0.6,
		[hasSpan]
	);
	const randomZIndex = useMemo(() => {
		const zIndexes = ['z-0', 'z-2'];
		return zIndexes[Math.round(Math.random() * (zIndexes.length - 1))];
	}, []);

	const className = useMemo(
		() =>
			classNames([
				'template-gallery-cell',
				randomZIndex,
				{
					'template-gallery-cell-empty': !image,
					'row-span-2': hasSpan,
					'col-span-2': hasSpanDouble,
				},
			]),
		[hasSpan, hasSpanDouble, image, randomZIndex]
	);

	return image ? (
		<Image
			className={className}
			src={image}
		/>
	) : (
		<div className={className} />
	);
};
export default Cell;
