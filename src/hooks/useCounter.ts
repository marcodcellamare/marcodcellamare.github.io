import { useCallback, useEffect, useRef, useState } from 'react';

import { IntervalType } from '@/types/misc';

export type CounterType = {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

const useCounter = (date: Date, noZero: boolean = false) => {
	const [counter, setCounter] = useState<Partial<CounterType>>({});
	const seconds = useRef<CounterType>({
		years: 60 * 60 * 24 * 365,
		months: 60 * 60 * 24 * 30,
		days: 60 * 60 * 24,
		hours: 60 * 60,
		minutes: 60,
		seconds: 1,
	});
	const intervalRef = useRef<IntervalType>(null);
	const counterRef = useRef<Partial<CounterType>>(counter);

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const update = useCallback(() => {
		const dateTimestamp = new Date(date).getTime();
		const currentDateTimestamp = new Date().getTime();

		let dateDiff = Math.abs((currentDateTimestamp - dateTimestamp) / 1000);
		let counter = { ...counterRef.current };

		(Object.keys(seconds.current) as (keyof CounterType)[]).forEach(
			(type) => {
				counter[type] = Math.floor(dateDiff / seconds.current[type]);
				dateDiff -= counter[type] * seconds.current[type];
			}
		);
		if (noZero)
			counter = Object.fromEntries(
				Object.entries(counter).filter(([_, value]) => value !== 0)
			) as Partial<CounterType>;

		setCounter(counter);
		counterRef.current = counter;
	}, [date, noZero]);

	useEffect(() => {
		update();
		intervalRef.current = setInterval(update, 1000);

		return () => {
			cleanup();
		};
	}, [date, update]);

	return counter;
};
export default useCounter;
