import { IntervalType } from '!/types/misc';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { CHARACTERS } from '!const';

interface LinkProps {
	children?: string | ReactNode;
}

const Link = ({ children }: LinkProps) => {
	const originalString =
		typeof children === 'string'
			? children
			: Array.isArray(children)
			? children.join('')
			: '';

	const [displayText, setDisplayText] = useState(originalString);

	const revealCount = useRef(0);
	const scrambleInterval = useRef<IntervalType>(null);
	const revealInterval = useRef<IntervalType>(null);

	const getRandomChar = () =>
		CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

	const scramble = useCallback(
		(text: string, revealCount: number = 0) =>
			text
				.split('')
				.map((char, i) =>
					i < revealCount
						? char
						: char === ' '
						? ' '
						: getRandomChar()
				)
				.join(''),
		[]
	);

	const stop = useCallback(() => {
		if (scrambleInterval.current !== null) {
			clearInterval(scrambleInterval.current);
			scrambleInterval.current = null;
		}
		if (revealInterval.current !== null) {
			clearInterval(revealInterval.current);
			revealInterval.current = null;
		}
		revealCount.current = 0;
		setDisplayText(originalString);
	}, [originalString]);

	const start = useCallback(() => {
		stop();

		revealInterval.current = setInterval(() => {
			const next = revealCount.current + 1;

			setDisplayText(scramble(originalString, next));

			if (
				next >= originalString.length &&
				revealInterval.current !== null
			) {
				clearInterval(revealInterval.current);
				revealInterval.current = null;
			}
			revealCount.current = next;
		}, 40);

		setDisplayText(scramble(originalString));
	}, [stop, originalString, scramble]);

	useEffect(() => {
		return () => stop();
	}, [originalString, stop]);

	return (
		<button
			type='button'
			className='btn btn-link text-[var(--color-link)] hover:text-[var(--color-link-hover)] active:text-[var(--color-link-active)]'
			onPointerEnter={start}
			onPointerLeave={stop}
			onClick={() => console.log('xxxxxx')}>
			{displayText}
		</button>
	);
};
export default Link;
