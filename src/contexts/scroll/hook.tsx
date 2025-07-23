import { useContext, useEffect, useRef } from 'react';
import { ScrollContext } from './context';

export const useScroll = (callback?: () => void) => {
	const context = useContext(ScrollContext);
	const callbackRunRef = useRef(false);

	if (!context) {
		throw new Error('useScroll must be used within a ScrollProvider');
	}

	useEffect(() => {
		if (!callback) return;

		if (!callbackRunRef.current) {
			callback();
			callbackRunRef.current = true;
		}
		const unsubscribe = context.subscribe(callback);

		return () => unsubscribe();
	}, [context, callback]);

	return {
		scrollX: context.scrollX,
		scrollY: context.scrollY,
		isWheeling: context.isWheeling,
		isScrolling: context.isScrolling,
	};
};
