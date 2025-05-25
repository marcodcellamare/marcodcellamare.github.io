import { useTranslation } from 'react-i18next';
import { DashLg } from 'react-bootstrap-icons';
//import '@styles/components/Period.scss';

const Period = ({
	dates,
	title,
	company,
	type,
	city,
	country,
	highlight,
	className = '',
}: {
	dates: [string, ...string[]];
	title: string;
	company: string;
	type?: string;
	city?: string;
	country?: string;
	highlight?: boolean;
	className?: string;
}) => {
	return (
		<div
			className={`period${
				highlight
					? ' period-highlight px-5 py-2 mx-n5 border border-2 border-dark'
					: ''
			} ${className}`.trim()}>
			<div className='row'>
				<div
					className={`col-12 ${
						dates.length > 1
							? 'col-md-5 col-lg-4 col-xl-3'
							: 'col-md-2 col-xl-1'
					}`}>
					<p className='h6 d-inline d-md-block fw-bold my-0 me-2'>
						<Dates dates={dates} />
					</p>
					{dates[1] ? (
						<p className='small d-inline d-md-block my-0'>
							<DatesDistance dates={dates} />
						</p>
					) : null}
				</div>
				<div className='col-12 col-md'>
					<h3 className='h6 fw-bold my-0'>{title}</h3>
					<p className='my-0 fst-italic'>
						<DashLg /> {company}
					</p>
					{type || city || country ? (
						<ul className='list-inline my-0 small'>
							{type ? (
								<li className='list-inline-item fw-bold'>
									{type}
								</li>
							) : null}
							{city ? (
								<li className='list-inline-item'>{city}</li>
							) : null}
							{country ? (
								<li className='list-inline-item'>
									({country})
								</li>
							) : null}
						</ul>
					) : null}
				</div>
			</div>
		</div>
	);
};
const Dates = ({ dates }: { dates: [string, ...string[]] }) => {
	// Shows the dates in a readable format

	const { i18n } = useTranslation();
	const dateFormatter = {
		yearsMonths: new Intl.DateTimeFormat(i18n.language, {
			year: 'numeric',
			month: 'numeric',
		}),
		years: new Intl.DateTimeFormat(i18n.language, {
			year: 'numeric',
		}),
	};
	const type = dates[0].length > 4 ? 'yearsMonths' : 'years';

	const startDate = dateFormatter[type].format(new Date(dates[0]));
	const endDate = dates[1]
		? dates[1] !== 'NOW'
			? dateFormatter[type].format(new Date(dates[1]))
			: i18n.t('com:NOW')
		: null;

	return <>{startDate + (endDate ? ' - ' + endDate : '')}</>;
};
const DatesDistance = ({ dates }: { dates: [string, ...string[]] }) => {
	// Calculates the distance between the dates

	const { i18n } = useTranslation();
	const types = ['years', 'months'];
	const seconds = {
		years: 60 * 60 * 24 * 365,
		months: 60 * 60 * 24 * 30,
		days: 60 * 60 * 24,
		hours: 60 * 60,
		minutes: 60,
		seconds: 1,
	};
	const startDate = new Date(dates[0]);
	const endDate = dates[1] !== 'NOW' ? new Date(dates[1]) : new Date();

	let diff = Math.abs((endDate.getTime() - startDate.getTime()) / 1000);
	let results = {};
	let resultsText = [];

	types.forEach((type) => {
		results[type] = Math.floor(diff / seconds[type]);

		if (results[type]) {
			resultsText.push(
				`${results[type]} ${i18n.t(`com:${type.toUpperCase()}`, {
					count: results[type],
				})}`.toLowerCase()
			);
		}
		diff -= results[type] * seconds[type];
	});
	return (
		<>{resultsText.join(` ${i18n.t('com:AND').toLocaleLowerCase()} `)}</>
	);
};
export default Period;
