import React from 'react';

class Counter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			years: 0,
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			show: []
		};
		this.types = [
			'years',
			'months',
			'days',
			'hours',
			'minutes',
			'seconds'
		];
		this.seconds = {
			years: 60 * 60 * 24 * 365,
			months: 60 * 60 * 24 * 30,
			days: 60 * 60 * 24,
			hours: 60 * 60,
			minutes: 60,
			seconds: 1
		};
		this.interval = false;
		this.date = false;
		this.now = false;
		this.diff = false;

		this.Init = this.Init.bind(this);
		this.Update = this.Update.bind(this);
	}
	componentDidMount() {
		this.Init()
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	Init() {
		this.date = new Date(this.props.since).getTime();
		this.now = false;

		this.interval = setInterval(() => {
			this.Update();
		}, 1000);

		this.Update();
	}
	Update() {
		this.now = new Date().getTime();
		this.diff = Math.abs((this.now - this.date) / 1000);

		let diff = this.diff;
		let results = {};
		let show = [];

		this.types.forEach(type => {
			results[type] = Math.floor(diff / this.seconds[type]);
			diff -= results[type] * this.seconds[type];

			if (results[type] > 0
				&& type !== 'years')
				show.push(type)
		});
		this.setState({
			...results,
			show: show
		});
	}
	render() {
		return <div className="counter">
			<h3 className="h2">
				{this.state.years
					+ ' '
					+ this.props.Locale.com[this.state.years === 1 ? 'YEAR' : 'YEARS'].toLowerCase()
					+ (this.state.show.length > 1
						? ','
						: '')}
			</h3>
			<p className="small fw-bold">
				{this.state.show.map((type, k) => {
					return <span key={k}>
						{(k === 0 && this.state.show.length === 1)
							|| (k === 1 && this.state.show.length === 2)
							|| k >= this.state.show.length - 1
							? ' ' + this.props.Locale.com.AND.toLowerCase() + ' '
							: (k > 0
								? ', '
								: '')}
						{this.state[type]
							+ ' '
							+ this.props.Locale.com[this.state[type] === 1 ? type.slice(0, -1).toUpperCase() : type.toUpperCase()].toLowerCase()}
					</span>
				})}
				{(this.state.show.length > 0 ? ' ' : '')
					+ this.props.Locale.com.OF_EXPERIENCE.toLowerCase()}.
			</p>
		</div>
	}
}
export default Counter;
