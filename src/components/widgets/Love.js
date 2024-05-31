import React from 'react';
import { CodeSquare, HandThumbsDown, Heart, Joystick, PlayCircle } from 'react-bootstrap-icons';
import Data from '../../assets/data/love.json';

class Love extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			k: false,
			over: false,
			type: '',
			title: '',
			titleTyping: '',
			link: '',
		};
		this.timeoutInit = false;

		this.Get = this.Get.bind(this);
		this.Typing = this.Typing.bind(this);
		this.Icon = this.Icon.bind(this);
		this.Hover = this.Hover.bind(this);
	}
	componentDidMount() {
		this.Get();
	}
	componentWillUnmount() {
		clearTimeout(this.timeoutInit);
	}
	Get() {
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
		});
		this.timeoutInit = setTimeout(() => {
			this.Typing();
		}, 500);
	}
	Typing() {
		/*
		let idx = 0;
				let word = this.word.split('');
				let interval;
		
				interval = setInterval(() => {
					let cloneWord = word.slice();
					let w = cloneWord.splice(0, idx);
		
					this.setState({ word: w.join('') });
		
					if (w.length >= word.length) {
						clearInterval(interval);
		
						setTimeout(() => {
							interval = setInterval(() => {
								if (!this.hover) {
									clearInterval(interval);
									this.WordInit();
								}
							}, 50);
		
						}, 2000);
					}
					idx++;
				}, 100);
		*/
	}
	Icon() {
		const props = {
			title: this.props.Locale.com[this.state.type.toUpperCase()],
			className: 'mx-2'
		}
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
	Hover(over) {
		this.setState({
			over: over
		});
	}
	render() {
		return this.state.type
			&& this.props.Locale.com[this.state.type.toUpperCase()]
			? <a
				className="love link-light link-underline-opacity-0"
				href={this.state.link}
				target="_blank"
				rel="noreferrer"
				onMouseEnter={() => this.Hover(false)}
				onMouseLeave={() => this.Hover(true)}
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
