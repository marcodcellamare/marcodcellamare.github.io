import { RefObject, useEffect, useState } from 'react';

const useScrollingPosition = (ref: RefObject<HTMLElement>): number => {
	const [top, setTop] = useState<number>(0);

	useEffect(() => {
		let current: HTMLElement = null;

		const onScroll = (e: Event & { target: HTMLElement }) => {
			setTop(e.target.scrollTop);
		};
		if (ref.current) {
			current = ref.current;
			current.addEventListener('scroll', onScroll);
		}
		return () => current?.removeEventListener('scroll', onScroll);
	});
	return top;
};
export default useScrollingPosition;
