import { useCallback, useEffect, useRef, useState } from 'react';

const useCounter = (since: string) => {
	const [counter, setCounter] = useState({
		years: null,
		months: null,
		days: null,
		hours: null,
		minutes: null,
		seconds: null,
	});
	const seconds = useRef({
		years: 60 * 60 * 24 * 365,
		months: 60 * 60 * 24 * 30,
		days: 60 * 60 * 24,
		hours: 60 * 60,
		minutes: 60,
		seconds: 1,
	});
	const timer = useRef<NodeJS.Timeout>(null);

	const update = useCallback((dateSince: number) => {
		// Calculate the difference between the current date and an old date

		const dateNow = new Date().getTime();
		let dateDiff = Math.abs((dateNow - dateSince) / 1000);
		let results = { ...counter };

		Object.keys(seconds.current).forEach((type, k) => {
			results[type] = Math.floor(dateDiff / seconds.current[type]);
			dateDiff -= results[type] * seconds.current[type];
		});
		setCounter(results);
	}, []);

	useEffect(() => {
		const dateSince = new Date(since).getTime();

		update(dateSince);
		timer.current = setInterval(() => update(dateSince), 1000);

		return () => clearInterval(timer.current);
	}, [since, update]);

	return counter;
};
export default useCounter;
