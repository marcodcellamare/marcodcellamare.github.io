import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings';
import { random } from '!/utils/math';
import classNames from 'classnames';

import { PALETTE } from '!const';

import { ThemeType } from '!/types/config.const';
import { IntervalType } from '!/types/misc';

type StripType = {
	height: number;
	color: ThemeType;
};

const Loader = () => {
	const { isNavOpened, isLoaderTickled } = useSettings();

	const [strips, setStrips] = useState<StripType[]>([]);
	const [stripsWidths, setStripsWidths] = useState<number[]>([]);
	const [stripsDelays, setStripsDelays] = useState<number[]>([]);

	const intervalRef = useRef<IntervalType>(null);
	const totalStripsRef = useRef(30);
	const stripWidthRangeRef = useRef({ min: 0.25, max: 2 });
	const stripHeightRangeRef = useRef({ min: 1, max: 10 });
	const stripDelayRangeRef = useRef({ min: 300, max: 500 });

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const generate = useCallback(() => {
		// Minimum total required space
		const totalMin =
			stripHeightRangeRef.current.min * totalStripsRef.current;

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

		heights.forEach((height) => {
			let color: ThemeType;

			do {
				color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
			} while (
				color === prevColor ||
				['light-gray', 'light-gray2', 'light-gray3'].includes(color)
			);

			strips.push({
				height,
				color,
			});
			prevColor = color;
		});

		setStrips(strips);
	}, []);

	useEffect(() => {
		if (!isLoaderTickled) return;

		const stripsWidths = [];
		const stripsDelays = [];

		for (let k = 0; k < totalStripsRef.current; k++) {
			stripsWidths.push(
				parseFloat(random(stripWidthRangeRef.current).toFixed(2))
			);
			stripsDelays.push(Math.round(random(stripDelayRangeRef.current)));
		}
		setStripsWidths(stripsWidths);
		setStripsDelays(stripsDelays);
	}, [isLoaderTickled]);

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
						!isNavOpened ? 'duration-600' : 'duration-300',
					])}
					style={{
						width: !isNavOpened
							? isLoaderTickled
								? `${stripsWidths[k]}rem`
								: '0.25rem'
							: '100%',
						height: `${strip.height}%`,
						backgroundColor: `var(--color-palette-${strip.color})`,
						transitionDelay: `${stripsDelays[k]}ms`,
					}}
				/>
			))}
		</div>
	);
};
export default Loader;
