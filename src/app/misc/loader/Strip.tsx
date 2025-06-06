import { windowSize } from '!/utils/misc';
import { useEffect } from 'react';

const LoaderStrip = () => {
	useEffect(() => {
		console.log(Math.random() * (100 + 20) + 20);
	}, []);

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 border'></div>
	);
};
export default LoaderStrip;
