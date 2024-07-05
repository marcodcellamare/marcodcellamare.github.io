import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const useScrolling = (): boolean => {
	const [isScrolling, setScrolling] = useState(false);
	let timeout = useRef<NodeJS.Timeout>(null);

	const onScroll = useCallback(() => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => setScrolling(false), 500);

		setScrolling(true);
	}, []);

	useEffect(() => {
		window.addEventListener('wheel', onScroll);

		return () => {
			clearTimeout(timeout.current);
			window.removeEventListener('wheel', onScroll);
		};
	}, [onScroll]);

	return isScrolling;
};
export default useScrolling;
