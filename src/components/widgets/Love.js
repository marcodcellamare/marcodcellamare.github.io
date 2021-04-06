import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import Locale from '../../assets/languages';
import Data from '../../assets/data/love.json';

class Love extends React.Component {
	constructor(props) {
		super(props);
		this.word = false;
		this.hover = false;
		this.state = {
			idx: false,
			word: '',
			link: '',
			type: ''
		};
	}
	render() {
		return <a href={this.state.link}
			target="_blank"
			rel="noreferrer"
			className="love d-inline-block"
			onMouseEnter={() => this.Hover()}
			onMouseLeave={() => this.Hover(true)}>
			{Locale.COM.I}
			<span className="love-icons d-inline-block mx-2">
				<Icon.Heart className={this.state.type === 'love' ? 'active' : ''} />
				<Icon.HandThumbsDown className={this.state.type === 'hate' ? 'active' : ''} />
				<Icon.PlayCircle className={this.state.type === 'music' ? 'active' : ''} />
				<Icon.Joystick className={this.state.type === 'play' ? 'active' : ''} />
				<Icon.Keyboard className={this.state.type === 'code' ? 'active' : ''} />
			</span>
			{this.state.word}
			<span className="love-cursor">_</span>
		</a>;
	}
	componentDidMount() {
		this.WordInit();
	}
	Hover(leave = false) {
		this.hover = !leave;
	}
	WordInit() {
		let idx = false;
		let data = false;

		do {
			idx = Math.floor(Math.random() * Data.length);
		}
		while (idx === this.state.idx);

		//

		data = Data[idx];

		this.setState({
			idx: idx,
			word: '',
			link: data.link,
			type: data.type
		});
		this.word = data.title;

		setTimeout(() => {
			this.WordBuild();
		}, 500);
	}
	WordBuild = () => {
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
	}
}

export default Love;
