import { useCallback, useEffect, useRef, useState } from 'react';

import { CHARACTERS } from '!const';

import { IntervalType } from '!/types/misc';

const useScramble = () => {
	const [originalText, setOriginalText] = useState('');
	const [displayText, setDisplayText] = useState('');

	const revealCount = useRef(0);
	const scrambleInterval = useRef<IntervalType>(null);
	const revealInterval = useRef<IntervalType>(null);

	const getRandomChar = () =>
		CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

	const memoizedSetOriginalText = useCallback(setOriginalText, [
		setOriginalText,
	]);

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
		setDisplayText(originalText);
	}, [originalText]);

	const start = useCallback(() => {
		if (!originalText) return;

		stop();

		revealInterval.current = setInterval(() => {
			const next = revealCount.current + 1;

			setDisplayText(scramble(originalText, next));

			if (
				next >= originalText.length &&
				revealInterval.current !== null
			) {
				clearInterval(revealInterval.current);
				revealInterval.current = null;
			}
			revealCount.current = next;
		}, 40);

		setDisplayText(scramble(originalText));
	}, [stop, originalText, scramble]);

	useEffect(() => setDisplayText(originalText), [originalText]);

	useEffect(() => () => stop(), [stop]);

	return {
		originalText,
		displayText,
		start,
		stop,

		setOriginalText: memoizedSetOriginalText,
	};
};
export default useScramble;
