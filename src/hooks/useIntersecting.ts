import { RefObject, useEffect, useMemo, useState } from 'react';

const useIntersecting = (ref: RefObject<HTMLElement>): boolean => {
	const [isIntersecting, setIntersecting] = useState(false);

	// Cache the IntersectionObserver

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) =>
				setIntersecting(entry.isIntersecting)
			),
		[]
	);

	// Observe the ref and eventually set if isIntersecting

	useEffect(() => {
		if (ref.current) {
			observer.observe(ref.current);
			return () => observer.disconnect();
		}
	}, [observer, ref]);

	return isIntersecting;
};
export default useIntersecting;
