import { useState, useEffect } from 'react';

const useIsTouch = () => {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const checkTouch = () => {
			setIsTouch(
				'ontouchstart' in window || navigator.maxTouchPoints > 0
			);
		};

		checkTouch();
	}, []);

	return isTouch;
};
export default useIsTouch;
