import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import useFormatDate from '@/hooks/useFormatDate';

import { CounterType } from '@/hooks/useCounter';
import { useTranslation } from 'react-i18next';

interface DatesIntervalProps {
	children?: string | ReactNode;
}

const DatesInterval = ({ children }: DatesIntervalProps) => {
	const { year } = useFormatDate();
	const { t } = useTranslation();

	const [dates, setdates] = useState<Date[]>([]);
	const [counter, setCounter] = useState<Partial<CounterType>>({});

	const currentDate = useRef(new Date());

	const datesFromChildren = useRef(
		(typeof children === 'string'
			? children
			: Array.isArray(children)
			? children.join('')
			: ''
		)
			.split(':')
			.slice(0, 2)
	);

	const isValidDate = (date: Date) => {
		return date instanceof Date && !isNaN(date.getTime());
	};

	useEffect(() => {
		const dates: Date[] = [currentDate.current, currentDate.current];

		datesFromChildren.current.forEach((dateFromChildren, k) => {
			let date: Date;

			if (isValidDate(new Date(dateFromChildren))) {
				date = new Date(dateFromChildren);
			} else {
				date = new Date();
			}
			dates[k] = date;
		});
		setdates(dates);
	}, []);

	useEffect(() => {
		if (dates.length !== 2) return;

		const counter: Partial<CounterType> = {
			years: 0,
			months: 0,
		};
		const seconds: Partial<CounterType> = {
			years: 60 * 60 * 24 * 365,
			months: 60 * 60 * 24 * 30,
		};
		let dateDiff = Math.abs(dates[0].getTime() - dates[1].getTime()) / 1000;

		(Object.keys(seconds) as (keyof Partial<CounterType>)[]).forEach(
			(type) => {
				if (!seconds[type]) return;

				counter[type] = Math.floor(dateDiff / seconds[type]);
				dateDiff -= counter[type] * seconds[type];
			}
		);
		setCounter(
			Object.fromEntries(
				Object.entries(counter).filter(([_, value]) => value !== 0)
			) as Partial<CounterType>
		);
	}, [dates]);

	if (dates.length !== 2) return null;

	return (
		<>
			{dates.map((date, k) => (
				<Fragment key={k}>
					{date !== currentDate.current
						? year(date)
						: t('counter.present')}
					{k < dates.length - 1 && ' - '}
				</Fragment>
			))}
			<small className='text-xs ml-4'>
				{(Object.keys(counter) as Partial<keyof CounterType>[]).map(
					(type, k) => (
						<span
							key={k}
							className='whitespace-nowrap'>
							{`${counter[type]} ${t(`counter.${type}`, {
								count: counter[type],
							}).toLowerCase()}`}
							{k < Object.keys(counter).length - 1 &&
								(k < Object.keys(counter).length - 2
									? ', '
									: ` ${t('counter.and').toLowerCase()} `)}
						</span>
					)
				)}
			</small>
		</>
	);
};
export default DatesInterval;
