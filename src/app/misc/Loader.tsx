import { useCallback, useEffect, useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { THEMES, ThemeType } from '!/types/config.const';
import { IntervalType } from '!/types/misc';

type StripType = {
	height: number;
	color: ThemeType;
};

const Loader = () => {
	const { height } = useResize();
	const { isNavOpened } = useSettings();

	const [strips, setStrips] = useState<StripType[]>([]);

	const intervalRef = useRef<IntervalType>(null);

	const max = 40;
	const min = 10;

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const stripHeight = () => Math.floor(Math.random() * (max - min + 1) + min);

	const generate = useCallback(() => {
		const strips: StripType[] = [];
		let prevColor: ThemeType | null = null;

		do {
			const height = stripHeight();
			let color: ThemeType;

			do {
				color = THEMES[Math.floor(Math.random() * THEMES.length)];
			} while (
				color === prevColor ||
				['light-gray', 'gray'].includes(color)
			);

			strips.push({
				height,
				color,
			});
			prevColor = color;
		} while (strips.reduce((sum, strip) => sum + strip.height, 0) < height);

		setStrips(strips);
	}, [height]);

	useEffect(() => {
		cleanup();
		generate();

		intervalRef.current = setInterval(generate, 60);

		return () => cleanup();
	}, [generate]);

	return (
		<div
			className={classNames([
				'absolute top-0 bottom-0 left-0 overflow-hidden transition-[width,opacity] pointer-events-none',
				!isNavOpened
					? 'w-[0.25rem] duration-600'
					: 'w-full duration-300',
				{
					'delay-350': !isNavOpened,
					'opacity-80': isNavOpened,
				},
			])}>
			{strips.map((strip, k) => (
				<div
					key={k}
					style={{
						height: `${strip.height}px`,
						backgroundColor: `var(--color-palette-${strip.color})`,
					}}
				/>
			))}
		</div>
	);
};
export default Loader;
