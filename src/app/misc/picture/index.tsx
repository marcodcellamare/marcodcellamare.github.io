import { CSSProperties } from 'react';
import classNames from 'classnames';

import Source from './Source';

export interface PictureProps {
	src: string;
	contain?: boolean;
	async?: boolean;
	className?: string;
	style?: CSSProperties;
	pictureClassName?: string;
}

const Picture = ({
	src,
	contain = true,
	async = false,
	className = 'w-full h-full',
	style,
	pictureClassName,
}: PictureProps) => {
	const optimizedFormats: string[] =
		import.meta.env.VITE_OPTIMIZED_IMAGES_FORMATS.split('|') ?? [];

	const parts = src.split('/');
	const path = parts.slice(0, -1).join('/');
	const fileName = parts.at(-1) ?? '';
	const [name, ext] = fileName.split(/\.(?=[^.]+$)/);

	return (
		<picture className={classNames(['block', pictureClassName])}>
			{optimizedFormats.map((format, k) => (
				<Source
					key={k}
					path={path}
					name={name}
					format={format === '@own' ? ext : format}
				/>
			))}
			<img
				src={src}
				loading='lazy'
				decoding={async ? 'async' : 'auto'}
				className={classNames([
					contain ? 'object-contain' : 'object-cover',
					className,
				])}
				style={style}
			/>
		</picture>
	);
};

export default Picture;
