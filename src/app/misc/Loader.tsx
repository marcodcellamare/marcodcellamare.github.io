import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { PALETTE } from '!const';

import { ThemeType } from '!/types/config.const';
import { IntervalType } from '!/types/misc';

type StripType = {
	height: number;
	color: ThemeType;
	delay: number;
};

const Loader = () => {
	const { isNavOpened } = useSettings();

	const [strips, setStrips] = useState<StripType[]>([]);

	const intervalRef = useRef<IntervalType>(null);
	const totalStripsRef = useRef(30);
	const stripHeightRangeRef = useRef({ min: 1, max: 10 });
	const stripDelayRangeRef = useRef({ min: 300, max: 500 });

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const stripDelay = () =>
		Math.floor(
			Math.random() *
				(stripDelayRangeRef.current.max -
					stripDelayRangeRef.current.min +
					1) +
				stripDelayRangeRef.current.min
		);

	const generate = useCallback(() => {
		const totalMin =
			stripHeightRangeRef.current.min * totalStripsRef.current; // Minimum total required space

		if (totalMin > 100) {
			console.warn('Min height per strip is too high for total strips.');
			return;
		}

		// Remaining space to distribute randomly
		const remaining = 100 - totalMin;
		const randomValues = Array.from(
			{ length: totalStripsRef.current },
			() => Math.random()
		);
		const totalRandom = randomValues.reduce((sum, val) => sum + val, 0);

		const heights = randomValues.map((val) => {
			// Scale random value to the share of remaining space
			const scaled = (val / totalRandom) * remaining;
			const finalHeight = stripHeightRangeRef.current.min + scaled;

			// Clamp to stripHeightRangeRef.current.max in case of extremes
			return Math.min(finalHeight, stripHeightRangeRef.current.max);
		});

		// If after clamping to stripHeightRangeRef.current.max we are under 100%, redistribute small leftovers:
		const finalTotal = heights.reduce((sum, h) => sum + h, 0);
		let diff = 100 - finalTotal;

		while (Math.abs(diff) > 0.01) {
			// Allowing tiny floating point tolerance
			for (let i = 0; i < heights.length && Math.abs(diff) > 0.01; i++) {
				const adjustment = Math.min(
					diff,
					stripHeightRangeRef.current.max - heights[i]
				);
				heights[i] += adjustment;
				diff -= adjustment;
			}
		}

		const strips: StripType[] = [];
		let prevColor: ThemeType | null = null;

		heights.forEach((heightPercent) => {
			let color: ThemeType;

			do {
				color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
			} while (
				color === prevColor ||
				['light-gray', 'light-gray2', 'light-gray3'].includes(color)
			);

			strips.push({
				height: heightPercent,
				color,
				delay: stripDelay(),
			});
			prevColor = color;
		});

		setStrips(strips);
	}, []);

	useEffect(() => {
		cleanup();
		generate();

		intervalRef.current = setInterval(generate, 70);

		return () => cleanup();
	}, [generate]);

	return (
		<div
			className={classNames([
				'absolute top-0 bottom-0 left-0 right-0 overflow-hidden pointer-events-none transition-[background-color,backdrop-filter] duration-700',
				isNavOpened
					? 'bg-[var(--color-palette-dark-gray)]/50 backdrop-blur-[0.2rem]'
					: 'bg-[var(--color-palette-dark-gray)]/0 backdrop-blur-[0rem] delay-600',
			])}>
			{strips.map((strip, k) => (
				<div
					key={k}
					className={classNames([
						'transition-[width]',
						!isNavOpened
							? 'w-[0.25rem] duration-600'
							: 'w-full duration-300',
					])}
					style={{
						height: `${strip.height}%`,
						backgroundColor: `var(--color-palette-${strip.color})`,
						transitionDelay: `${strip.delay}ms`,
					}}
				/>
			))}
		</div>
	);
};
export default Loader;
