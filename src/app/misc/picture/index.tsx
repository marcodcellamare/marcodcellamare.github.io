import { CSSProperties } from 'react';
import classNames from 'classnames';

import Source from './Source';

export interface PictureProps {
	src: string;
	contain?: boolean;
	async?: boolean;
	hero?: boolean;
	className?: string;
	style?: CSSProperties;
	pictureClassName?: string;
}

const Picture = ({
	src,
	contain = true,
	async = true,
	hero,
	className = 'w-full h-full',
	style,
	pictureClassName,
}: PictureProps) => {
	const optimizedDir = import.meta.env.VITE_OPTIMIZED_IMAGES_DIR ?? '';
	const optimizedFormats: string[] =
		import.meta.env.VITE_OPTIMIZED_IMAGES_FORMATS.split('|') ?? [];

	const parts = src.split('/');
	const path = parts.slice(0, -1).join('/');
	const fileName = parts.at(-1) ?? '';
	const [name, ext] = fileName.split(/\.(?=[^.]+$)/);

	return (
		<picture className={classNames(['block', pictureClassName])}>
			{optimizedFormats.map(
				(format) =>
					format !== '@own' && (
						<Source
							key={format}
							path={path}
							name={name}
							format={format === '@own' ? ext : format}
							hero={hero ?? false}
						/>
					)
			)}
			<img
				src={`${path}/${optimizedDir}/${name}.${ext}`}
				fetchPriority={!hero ? 'auto' : 'high'}
				loading={!hero ? 'lazy' : 'eager'}
				decoding={async ? 'async' : 'auto'}
				alt={name}
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
