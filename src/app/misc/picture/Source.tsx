import { useMemo, useRef } from 'react';

interface SourceProps {
	path: string;
	name: string;
	format: string;
}

const Source = ({ path, name, format }: SourceProps) => {
	const optimizedDir = import.meta.env.VITE_OPTIMIZED_IMAGES_DIR ?? '';
	const optimizedSizes = useRef<number[]>(
		import.meta.env.VITE_OPTIMIZED_IMAGES_SIZES.split('|').map(Number) ?? []
	);

	const mimetype = useMemo(() => {
		switch (format) {
			case 'jpg':
			case 'jpeg':
				return 'image/jpeg';
			case 'png':
				return 'image/png';
			case 'avif':
				return 'image/avif';
			case 'webp':
				return 'image/webp';
		}
		return '';
	}, [format]);

	const srcSet = useMemo(() => {
		const set: string[] = [];

		optimizedSizes.current.forEach((size) => {
			set.push(
				`${path}/${optimizedDir}/${size}/${name}.${format} ${size}w`
			);
		});
		return set.join(', ');
	}, [optimizedSizes, path, optimizedDir, name, format]);

	return (
		<source
			type={mimetype}
			srcSet={srcSet}
			sizes='(min-width: 1920px) 1200px, (min-width: 1280px) 1000px, (min-width: 768px) 80vw, 100vw'
		/>
	);
};

export default Source;
