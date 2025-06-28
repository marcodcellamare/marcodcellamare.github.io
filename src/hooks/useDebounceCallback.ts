import { useEffect, useRef, useCallback } from 'react';

import { TimeoutType } from '!/types/misc';

export const useDebounceCallback = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) => {
	const timeoutRef = useRef<TimeoutType>(null);
	const callbackRef = useRef(callback);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const debounced = useCallback(
		(...args: Parameters<T>) => {
			cleanup();
			timeoutRef.current = setTimeout(
				() => callbackRef.current(...args),
				delay
			);
		},
		[delay]
	);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		return cleanup;
	}, []);

	return debounced;
};
