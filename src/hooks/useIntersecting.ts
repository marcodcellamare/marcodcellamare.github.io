import { RefObject, useEffect, useState } from 'react';

const useIntersecting = (ref: RefObject<HTMLElement | null>): boolean => {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting)
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref]);

	return isIntersecting;
};
export default useIntersecting;
