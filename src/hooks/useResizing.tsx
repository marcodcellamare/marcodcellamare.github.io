import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Size as SizeInterface } from '@interfaces/math';

const useResizing = (
	ref?: RefObject<HTMLElement>
): SizeInterface & { isResizing: boolean } => {
	// This hook returns the current size of an object passed as ref
	// If no object is passed, it will return the window size

	const [size, setSize] = useState({ w: 0, h: 0 });
	const [isResizing, setIsResizing] = useState(false);
	let timer = useRef<NodeJS.Timeout>(null);

	const get = useCallback((): SizeInterface => {
		return {
			w: ref
				? ref.current
					? ref.current.getBoundingClientRect().width
					: 0
				: window.innerWidth,
			h: ref
				? ref.current
					? ref.current.getBoundingClientRect().height
					: 0
				: window.innerHeight,
		};
	}, [ref]);

	const onResize = useCallback(() => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setIsResizing(false), 500);

		setSize(get());
		setIsResizing(true);
	}, [get]);

	useEffect(() => {
		setSize(get());
		window.addEventListener('resize', onResize);

		return () => {
			clearTimeout(timer.current);
			window.removeEventListener('resize', onResize);
		};
	}, [get, onResize]);
	return { ...size, isResizing };
};
export default useResizing;
