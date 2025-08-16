import { useMemo } from 'react';
import Image from './Image';

import classNames from 'classnames';

interface CellProps {
	image: string;
}

const Cell = ({ image }: CellProps) => {
	const hasSpan = useMemo(() => Math.random() < 0.4, []);
	const hasSpanDouble = useMemo(
		() => hasSpan && Math.random() < 0.5,
		[hasSpan]
	);

	const className = useMemo(
		() =>
			classNames([
				'template-gallery-cell',
				{
					'template-gallery-cell-empty': !image,
					'row-span-2': hasSpan,
					'col-span-2': hasSpanDouble,
				},
			]),
		[hasSpan, hasSpanDouble, image]
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
