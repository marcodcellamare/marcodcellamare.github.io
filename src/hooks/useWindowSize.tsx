import { useEffect, useState } from 'react';
import { Size as SizeInterface } from '@interfaces/math';

const useWindowSize = (): SizeInterface => {
	const [size, setSize] = useState(get());

	useEffect(() => {
		const onResize = () => {
			setSize(get());
		};
		document.addEventListener('resize', onResize);
		return () => document.removeEventListener('resize', onResize);
	});
	return size;
};
const get = (): SizeInterface => {
	return {
		w: window.innerWidth,
		h: window.innerHeight,
	};
};
export default useWindowSize;
