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
			show: [],
			br: false,
			postBr: []
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
		let br = this.props.br;
		let brFound = false;
		let postBr = [];

		this.types.forEach((type, k) => {
			results[type] = Math.floor(diff / this.seconds[type]);
			diff -= results[type] * this.seconds[type];

			if (results[type] > 0) {
				if (br) {
					if (!brFound
						&& br === type)
						brFound = true;
					else if (brFound)
						postBr.push(type);
				}
				show.push(type);
			}
			else {
				if (br
					&& !brFound
					&& br === type)
					br = this.types[k + 1] ? this.types[k + 1] : false;
			}
		});
		this.setState(prevState => {
			return {
				...prevState,
				...results,
				show: show,
				br: br,
				postBr: postBr
			}
		});
	}
	render() {
		return this.state.show.length > 0
			? <p className={'counter'
				+ (this.props.className ? ' ' + this.props.className : '')}>
				{this.props.prefx
					? <span className={'counter-item counter-prefx'
						+ (this.props.classNamePreBr ? ' ' + this.props.classNamePreBr : '')}>
						{this.props.prefx + ' '}
					</span>
					: null}
				{this.state.show.map((type, k) => {
					return <React.Fragment key={k}>
						<span
							className={'counter-item counter-count counter-count-' + k + ' counter-count-' + type
								+ (!this.state.postBr.includes(type)
									? (' counter-item-pre'
										+ (this.props.classNamePreBr ? ' ' + this.props.classNamePreBr : ''))
									: (' counter-item-post'
										+ (this.props.classNamePostBr ? ' ' + this.props.classNamePostBr : '')))}>
							<span className="counter-count-number">
								{this.state[type]}
							</span>
							<span className="counter-count-text">
								{' ' + this.props.Locale.com[this.state[type] === 1 ? type.slice(0, -1).toUpperCase() : type.toUpperCase()].toLowerCase()}
							</span>
							<span className="counter-count-separator">
								{k < this.state.show.length - 2
									? ', '
									: (k === this.state.show.length - 2
										? ' ' + this.props.Locale.com.AND.toLowerCase() + ' '
										: (!this.props.suffx
											? '.'
											: null))}
							</span>
						</span>
						{this.state.br === type
							? <br />
							: null}
					</React.Fragment>
				})}
				{this.props.suffx
					? <span className={'counter-item counter-suffx'
						+ (this.state.postBr.length === 0
							? (this.props.classNamePreBr ? ' ' + this.props.classNamePreBr : '')
							: (this.props.classNamePostBr ? ' ' + this.props.classNamePostBr : ''))}>
						{' ' + this.props.suffx.charAt(0).toLowerCase() + this.props.suffx.slice(1)}.
					</span>
					: null}
			</p>
			: null
	}
}
export default Counter;
