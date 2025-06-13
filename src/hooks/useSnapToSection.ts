import { useEffect, useRef } from 'react';

import { TimeoutType } from '!/types/misc';

const useSnapToSection = (
	containerRef: React.RefObject<HTMLElement | null>,
	offsetPercent: number = 0.2
) => {
	const timeoutRef = useRef<TimeoutType>(null);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			cleanup();

			timeoutRef.current = setTimeout(() => {
				const sections = Array.from(
					container.querySelectorAll<HTMLElement>('section')
				);
				const containerRect = container.getBoundingClientRect();
				const offset = containerRect.height * offsetPercent;

				for (const section of sections) {
					const sectionRect = section.getBoundingClientRect();
					const distance = Math.abs(
						sectionRect.top - containerRect.top
					);
					if (distance < offset) {
						container.scroll({
							top: section.offsetTop,
							behavior: 'smooth',
						});
						break;
					}
				}
			}, 500);
		};
		container.addEventListener('scroll', handleScroll);

		return () => {
			cleanup();
			container.removeEventListener('scroll', handleScroll);
		};
	}, [containerRef, offsetPercent]);
};
export default useSnapToSection;
