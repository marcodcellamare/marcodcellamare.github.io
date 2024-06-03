import React from 'react';
import { CodeSquare, HandThumbsDown, Heart, Joystick, PlayCircle } from 'react-bootstrap-icons';
import Data from '../../assets/data/love.json';

class Love extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			k: false,
			over: false,
			type: '',
			title: '',
			titleTyping: '',
			link: '',
		};
		this.timeoutStarted = false;
		this.timeoutTyping = false;
		this.timeoutTyped = false;
		this.timeoutEnded = false;
		this.intervalTyping = false;

		this.status = '';

		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onStarted = this.onStarted.bind(this);
		this.onTyping = this.onTyping.bind(this);
		this.onTyped = this.onTyped.bind(this);
		this.onEnded = this.onEnded.bind(this);
		this.onHover = this.onHover.bind(this);
		this.Icon = this.Icon.bind(this);
		this.Clear = this.Clear.bind(this);
	}
	componentDidMount() {
		this.onStart();
	}
	componentWillUnmount() {
		this.Clear();
	}
	onTransitionEnd(e) {
		if (e.target.classList.contains('love-icon')
			&& e.propertyName === 'opacity') {

			if (!this.state.show)
				this.onEnded();
		}
	}
	onStart() {
		this.Clear();
		this.status = 'start';

		let k;

		do {
			k = Math.floor(Math.random() * Data.length);
		}
		while (k === this.state.k);

		//

		this.setState({
			k: k,
			type: Data[k].type,
			title: Data[k].title,
			titleTyping: '',
			link: Data[k].link,
		}, this.onStarted);
	}
	onStarted() {
		this.Clear();
		this.status = 'started';

		this.timeoutStarted = setTimeout(() => {
			this.setState({
				show: true
			}, () => {
				this.timeoutTyping = setTimeout(this.onTyping, 500);
			})
		}, 100);
	}
	onTyping() {
		this.Clear();
		this.status = 'typing';

		const title = this.state.title.split('');
		let idx = 0;

		this.intervalTyping = setInterval(() => {
			let _title = title.slice();
			let char = _title.splice(0, idx);

			if (idx <= title.length) {
				this.setState({
					titleTyping: char.join('')
				});
			}
			else
				this.onTyped(false);

			idx++;
		}, 80);
	}
	onTyped(fromOver) {
		this.Clear();
		this.status = 'typed';

		if (!this.state.over) {
			this.timeoutTyped = setTimeout(() => {
				this.setState({
					show: false,
					titleTyping: ''
				});
			}, !fromOver ? 3000 : 500);
		}
	}
	onEnded() {
		this.Clear();
		this.status = 'ended';

		this.timeoutEnded = setTimeout(() => {
			this.onStart();
		}, 200);
	}
	onHover(over) {
		this.setState({
			over: over
		}, () => {
			if (this.status === 'typed') {
				if (!this.state.over)
					this.onTyped(true);
				else
					this.Clear();
			}
		});
	}
	Icon() {
		const props = {
			title: this.props.Locale.com[this.state.type.toUpperCase()],
			className: 'love-icon mx-2'
		};
		switch (this.state.type) {
			case 'hate':
				return <HandThumbsDown
					{...props} />

			case 'music':
				return <PlayCircle
					{...props} />

			case 'play':
				return <Joystick
					{...props} />

			case 'code':
				return <CodeSquare
					{...props} />

			case 'love':
			default:
				return <Heart
					{...props} />
		}
	}
	Clear() {
		clearTimeout(this.timeoutStarted);
		clearTimeout(this.timeoutTyping);
		clearTimeout(this.timeoutTyped);
		clearTimeout(this.timeoutEnded);
		clearInterval(this.intervalTyping);
	}
	render() {
		return this.state.type
			&& this.props.Locale.com[this.state.type.toUpperCase()]
			? <a
				className={'love link-light link-underline-opacity-0'
					+ (this.state.show ? ' show' : '')}
				href={this.state.link}
				target="_blank"
				rel="noreferrer"
				onMouseEnter={() => this.onHover(true)}
				onMouseLeave={() => this.onHover(false)}
				onTransitionEnd={this.onTransitionEnd}
				title={this.props.Locale.com.I + ' ' + this.props.Locale.com[this.state.type.toUpperCase()].toLowerCase() + ' ' + this.state.title}>
				{this.props.Locale.com.I}
				{this.Icon()}
				{this.state.titleTyping}
				<span className="love-cursor">_</span>
			</a>
			: null
	}
}

export default Love;
