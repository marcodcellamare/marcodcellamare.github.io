import { useCallback, useEffect, useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';
import { useSettings } from '!/contexts/settings';

import { IntervalType } from '!/types/misc';
import { THEMES, ThemeType } from '!/types/config.const';
import classNames from 'classnames';

type StripType = {
	height: number;
	color: ThemeType;
};

const Loader = () => {
	const { height } = useResize();
	const { isNavOpened } = useSettings();

	const [strips, setStrips] = useState<StripType[]>([]);

	const intervalRef = useRef<IntervalType>(null);

	const max = 50;
	const min = 5;

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
			} while (color === prevColor);

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

		intervalRef.current = setInterval(generate, 100);

		return () => cleanup();
	}, [generate]);

	return (
		<div
			className={classNames([
				'absolute top-0 bottom-0 left-0 overflow-hidden mix-blend-difference transition-[width] duration-500 delay-300',
				!isNavOpened ? 'w-[0.25rem]' : 'w-full',
			])}>
			{strips.map((strip, k) => (
				<div
					key={k}
					style={{
						height: strip.height,
						backgroundColor: `var(--color-palette-${strip.color})`,
					}}
				/>
			))}
		</div>
	);
};
export default Loader;
