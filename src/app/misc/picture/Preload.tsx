import { useMemo, useRef } from 'react';

interface PreloadProps {
	path: string;
	name: string;
	formats: string[];
}

const Preload = ({ path, name, formats }: PreloadProps) => {
	return null;

	/* const srcSet = useMemo(() => {
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
	); */
};

export default Preload;
