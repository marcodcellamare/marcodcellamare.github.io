import { useCallback, useEffect, useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';

import { IntervalType } from '!/types/misc';

type StripType = {
	h: number;
	c: string;
};

const Loader = () => {
	const { height } = useResize();

	const [strips, setStrips] = useState<StripType[]>([]);

	const intervalRef = useRef<IntervalType>(null);

	const max = 100;
	const min = 50;

	const stripHeight = () => Math.floor(Math.random() * (max - min + 1) + min);

	/*
	const generate = useCallback(() => {
		const strips: StripType[] = [];

		do {
			//strips.push(stripHeight());
		} while (strips.reduce((sum, strip) => sum + strip.h, 0) < height);

		/*
		console.log(
			strips,
			strips.reduce((a, h) => a + h, 0),
			height
		);
		* /
		//setStrips;
	}, [height]);

	useEffect(() => {
		intervalRef.current = setInterval(generate, 300);
		generate();
	}, [generate]);
	*/

	return (
		<div className='absolute top-0 bottom-0 left-0 right-1/2 bg-white/20 border overflow-hidden'>
			{strips.map((strip, k) => (
				<div
					key={k}
					className='border'
					style={{ height: strip.h }}
				/>
			))}
		</div>
	);
};
export default Loader;
