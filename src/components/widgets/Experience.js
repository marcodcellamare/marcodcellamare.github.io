import React from 'react';
import Locale from '../../assets/languages';

class Experience extends React.Component {
	constructor(props) {
		super(props);
		this.date = this.props.date;
		this.now = false;
		this.diff = false;
		this.interval = false;
		this.secs = {
			years: 60 * 60 * 24 * 365,
			months: 60 * 60 * 24 * 30,
			days: 60 * 60 * 24,
			hours: 60 * 60,
			minutes: 60,
			seconds: 1
		};
		this.state = {
			years: 0,
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	}
	render() {
		return <div className="experience">
			{this.state.years > 0 ? (this.state.years + ' ' + (this.state.years === 1 ? Locale.COM.YEAR : Locale.COM.YEARS).toLowerCase()) + ', ' : null}
			{this.state.months > 0 ? (this.state.months + ' ' + (this.state.months === 1 ? Locale.COM.MONTH : Locale.COM.MONTHS).toLowerCase()) + ', ' :
				null}
			{this.state.days + ' ' + (this.state.days === 1 ? Locale.COM.DAY : Locale.COM.DAYS).toLowerCase() + ', '}
			{this.state.hours + ' ' + (this.state.hours === 1 ? Locale.COM.HOUR : Locale.COM.HOURS).toLowerCase() + ', '}
			{this.state.minutes + ' ' + (this.state.minutes === 1 ? Locale.COM.MINUTE : Locale.COM.MINUTES).toLowerCase() + ' '}
			{(Locale.COM.AND).toLowerCase() + ' '}
			{this.state.seconds + ' ' + (this.state.seconds === 1 ? Locale.COM.SECOND : Locale.COM.SECONDS).toLowerCase()}
		</div>;
	}
	componentDidMount() {
		this.CounterInit();
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	CounterInit() {
		this.date = new Date(this.date).getTime();
		this.now = false;

		this.CounterUpdate();
		this.interval = setInterval(() => {
			this.CounterUpdate();
		}, 1000);
	}
	CounterUpdate() {
		this.now = new Date().getTime();
		this.diff = Math.abs((this.now - this.date) / 1000);

		let d = this.diff;
		let r = {};

		Object.keys(this.secs).forEach((key, j) => {
			r[key] = Math.floor(d / this.secs[key]);
			d -= r[key] * this.secs[key];
		});
		this.setState(r);
	}
}

export default Experience;
