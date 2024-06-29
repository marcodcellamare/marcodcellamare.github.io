import { useEffect, useState } from 'react';

const useScrolling = (): boolean => {
	const [isScrolling, setScrolling] = useState<boolean>(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		const onScroll = () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => setScrolling(false), 500);

			setScrolling(true);
		};
		window.addEventListener('wheel', onScroll);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener('wheel', onScroll);
		};
	});
	return isScrolling;
};
export default useScrolling;
