import { useCallback, useEffect, useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { THEMES, ThemeType } from '!/types/config.const';
import { IntervalType } from '!/types/misc';

type StripType = {
	height: number;
	color: ThemeType;
	delay: number;
};

const Loader = () => {
	const { height } = useResize();
	const { isNavOpened } = useSettings();

	const [strips, setStrips] = useState<StripType[]>([]);

	const intervalRef = useRef<IntervalType>(null);
	const stripHeightRange = useRef({ min: 10, max: 40 });
	const stripDelayRange = useRef({ min: 300, max: 500 });

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const stripHeight = () =>
		Math.floor(
			Math.random() *
				(stripHeightRange.current.max -
					stripHeightRange.current.min +
					1) +
				stripHeightRange.current.min
		);
	const stripDelay = () =>
		Math.floor(
			Math.random() *
				(stripDelayRange.current.max -
					stripDelayRange.current.min +
					1) +
				stripDelayRange.current.min
		);

	const generate = useCallback(() => {
		const strips: StripType[] = [];
		let prevColor: ThemeType | null = null;

		do {
			let color: ThemeType;

			do {
				color = THEMES[Math.floor(Math.random() * THEMES.length)];
			} while (
				color === prevColor ||
				['light-gray', 'gray'].includes(color)
			);

			strips.push({
				height: stripHeight(),
				color,
				delay: stripDelay(),
			});
			prevColor = color;
		} while (
			strips.reduce((sum, strip) => sum + strip.height, 0) <
			height * 1.2
		);

		setStrips(strips);
	}, [height]);

	useEffect(() => {
		cleanup();
		generate();

		intervalRef.current = setInterval(generate, 60);

		return () => cleanup();
	}, [generate]);

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 overflow-hidden pointer-events-none'>
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
						height: `${strip.height}px`,
						backgroundColor: `var(--color-palette-${strip.color})`,
						transitionDelay: `${strip.delay}ms`,
					}}
				/>
			))}
		</div>
	);
};
export default Loader;
