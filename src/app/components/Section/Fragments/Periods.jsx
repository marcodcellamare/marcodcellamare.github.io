import React from 'react';

import '../../../../styles/components/SectionPeriods.scss';

class Periods extends React.Component {
	constructor(props) {
		super(props);

		this.types = ['years', 'months'];
		this.seconds = {
			years: 60 * 60 * 24 * 365,
			months: 60 * 60 * 24 * 30,
			days: 60 * 60 * 24,
			hours: 60 * 60,
			minutes: 60,
			seconds: 1,
		};
		this.dateFormatter = {
			yearsMonths: new Intl.DateTimeFormat(this.props.language, {
				year: 'numeric',
				month: 'numeric',
			}),
			years: new Intl.DateTimeFormat(this.props.language, {
				year: 'numeric',
			}),
		};
		this.Years = this.Years.bind(this);
	}
	Years(start, end) {
		start = new Date(start);
		end = end !== 'NOW' ? new Date(end) : new Date();

		let diff = Math.abs((end.getTime() - start.getTime()) / 1000);
		let results = {};
		let resultsText = [];

		this.types.forEach((type, k) => {
			results[type] = Math.floor(diff / this.seconds[type]);

			if (results[type])
				resultsText.push(
					results[type] +
						' ' +
						(results[type] !== 1
							? this.props.Locale.com[type.toUpperCase()]
							: this.props.Locale.com[
									type.slice(0, -1).toUpperCase()
							  ]
						).toLowerCase()
				);

			diff -= results[type] * this.seconds[type];
		});
		return resultsText.join(
			' ' + this.props.Locale.com.AND.toLowerCase() + ' '
		);
	}
	render() {
		return this.props._ && this.props._.length > 0 ? (
			<div
				className={
					'section-periods' +
					(this.props.className ? ' ' + this.props.className : '')
				}>
				{this.props._.map((period, k) => {
					return (
						<div
							key={k}
							className={
								'section-period-' +
								k +
								' mb-5' +
								(period.highlight
									? ' px-5 py-2 mx-n5 border border-2 border-dark'
									: '')
							}>
							<div className='row'>
								<div className='col-12 col-md-5 col-lg-4 col-xl-3'>
									<p className='h6 d-inline d-md-block fw-bold my-0 me-2'>
										{this.dateFormatter[
											period.dates[0].length > 4
												? 'yearsMonths'
												: 'years'
										].format(new Date(period.dates[0])) +
											(period.dates[0].length > 4 &&
											period.dates[1]
												? ' - ' +
												  (period.dates[1] !== 'NOW'
														? this.dateFormatter.yearsMonths.format(
																new Date(
																	period.dates[1]
																)
														  )
														: this.props.Locale.com[
																period.dates[1]
														  ])
												: '')}
									</p>
									{period.dates[1] ? (
										<p className='small d-inline d-md-block my-0'>
											{this.Years(
												period.dates[0],
												period.dates[1]
											)}
										</p>
									) : null}
								</div>
								<div className='col-12 col-md-7 col-lg-8 col-xl-9'>
									{period.title ? (
										<h3 className='h6 fw-bold my-0'>
											{period.title}
										</h3>
									) : null}
									{period.company ? (
										<p className='my-0 fst-italic'>
											{period.company}
										</p>
									) : null}
									{period.type ||
									period.city ||
									period.country ? (
										<p className='my-0 small'>
											{period.type ? (
												<strong>{period.type}</strong>
											) : null}
											{period.city ? (
												<span>{period.city}</span>
											) : null}
											{period.country ? (
												<span>({period.country})</span>
											) : null}
										</p>
									) : null}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		) : null;
	}
}
export default Periods;
