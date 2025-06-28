import { useCallback, useEffect, useRef } from 'react';

import { TimeoutType } from '!/types/misc';

const useThrottleCallback = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) => {
	const lastCallRef = useRef<number>(0);
	const timeoutRef = useRef<TimeoutType>(null);
	const callbackRef = useRef(callback);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const throttled = useCallback(
		(...args: Parameters<T>) => {
			const now = Date.now();
			const timeSinceLastCall = now - lastCallRef.current;

			if (timeSinceLastCall >= delay) {
				lastCallRef.current = now;
				callbackRef.current(...args);
			} else if (!timeoutRef.current) {
				timeoutRef.current = setTimeout(() => {
					lastCallRef.current = Date.now();
					timeoutRef.current = null;
					callbackRef.current(...args);
				}, delay - timeSinceLastCall);
			}
		},
		[delay]
	);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		return cleanup;
	}, []);

	return throttled;
};
export default useThrottleCallback;
