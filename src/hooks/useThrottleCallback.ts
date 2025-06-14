import { useCallback, useEffect, useRef } from 'react';

import { TimeoutType } from '!/types/misc';

const useThrottleCallback = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) => {
	const lastCallRef = useRef<number>(0);
	const timeoutRef = useRef<TimeoutType>(null);

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
				callback(...args);
			} else if (!timeoutRef.current) {
				timeoutRef.current = setTimeout(() => {
					lastCallRef.current = Date.now();
					timeoutRef.current = null;
					callback(...args);
				}, delay - timeSinceLastCall);
			}
		},
		[callback, delay]
	);

	useEffect(() => cleanup, []);

	return throttled;
};
export default useThrottleCallback;
