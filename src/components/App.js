import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Config from '../assets/config.json';
import Locale from '../assets/languages';
import '../assets/scss/main.scss';
import { Footer, Header, Main, Title } from './layout';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			language: Config.DEFAULT_LANGUAGE,
			Locale: {},
			current: {
				page: 'home',
				slide: 0,
				theme: '',
				title: ''
			},
			mounted: {
				title: false
			}
		};
		this.ref = {
			title: false
		};
		this.html = document.documentElement;
		this.timeoutTitle = false;

		this.Locale = new Locale();

		this.onScroll = this.onScroll.bind(this);
		this.onScrollStart = this.onScrollStart.bind(this);
		this.onScrollEnd = this.onScrollEnd.bind(this);
		this.onSlide = this.onSlide.bind(this);
		this.Init = this.Init.bind(this);
		this.Language = this.Language.bind(this);
		this.Mount = this.Mount.bind(this);
		this.Unmount = this.Unmount.bind(this);
	}
	componentDidMount() {
		clearTimeout(this.timeoutTitle);

		this.Init();
	}
	onScroll(slide) {

	}
	onScrollStart(slide) {
		clearTimeout(this.timeoutTitle);

		this.Mount('title', () => {
			if (this.ref.title)
				this.ref.title.Show();
		});
	}
	onScrollEnd(slide, _new) {
		clearTimeout(this.timeoutTitle);

		if (this.ref.title) {
			this.timeoutTitle = setTimeout(() => {
				this.ref.title.Hide();
			}, 1000);
		}
	}
	onSlide(slide, load) {
		clearTimeout(this.timeoutTitle);

		this.setState(prevState => {
			return {
				current: {
					...prevState.current,
					slide: slide,
					theme: this.state.Locale.pages[this.state.current.page][slide].theme,
					title: this.state.Locale.pages[this.state.current.page][slide].SLIDE_TITLE
						? this.state.Locale.pages[this.state.current.page][slide].SLIDE_TITLE
						: this.state.Locale.pages[this.state.current.page][slide].TITLE
				}
			}
		}, () => {
			this.html.classList = '';
			this.html.classList.add(this.state.current.theme);

			if (!load)
				this.html.classList.add('transition');
		});
	}
	Init() {
		let languages = [];

		Object.keys(Config.LANGUAGES).forEach(iso => {
			if (Config.LANGUAGES[iso].state)
				languages.push({
					iso: iso,
					...Config.LANGUAGES[iso]
				});
		});
		languages.sort((a, b) => {
			return a.LABEL.localeCompare(b.LABEL);
		});

		this.setState({
			languages: languages,
			Locale: this.Locale
		}, () => {
			this.Language();
		});
	}
	Language() {
		/*
		let language = this.state.languages.find(language => {
			return language.iso === iso
		});
		if (language)
			language = language.iso;
		else
			language = Config.DEFAULT_LANGUAGE;

		window.location.hash = language;
		this.html.setAttribute('lang', language.substring(0, 2));

		this.Locale.Set(language);

		//

		let student = {
			firstName: this.Locale.student.FIRST_NAME,
			email: this.Locale.student.EMAIL
		};
		if (!this.GUARD.error) {
			student.firstName = this.GUARD.Student().first_name;
			student.email = this.GUARD.Student().email;
		}
		else if (this.Scorm.Check())
			student.firstName = this.Scorm.data.name;

		//

		this.setState({
			language: language,
			Locale: this.Locale,
			student: student
		}, callback);
		*/
	}
	Mount(component, callback) {
		callback = typeof (callback) === 'function' ? callback : () => { };

		if (this.state.mounted.hasOwnProperty(component)) {
			this.setState(prevState => ({
				mounted: {
					...prevState.mounted,
					[component]: true
				}
			}), callback);
		}
	}
	Unmount(component, callback) {
		callback = typeof (callback) === 'function' ? callback : () => { };

		if (this.state.mounted.hasOwnProperty(component))
			this.setState(prevState => ({
				mounted: {
					...prevState.mounted,
					[component]: false
				}
			}), callback);
	}
	render() {
		return Object.keys(this.state.Locale).length > 0
			? <div className="app d-flex position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden">
				<div className="d-flex flex-column flex-grow-1">
					<Header
						Locale={this.state.Locale} />
					<Router>
						<Main
							Locale={this.state.Locale}
							sinceDate={Config.SINCE}
							current={this.state.current}
							onScroll={this.onScroll}
							onScrollStart={this.onScrollStart}
							onScrollEnd={this.onScrollEnd}
							onSlide={this.onSlide} />
					</Router>
					<Footer
						Locale={this.state.Locale} />
				</div>
				{this.state.mounted.title
					? <Title
						ref={e => this.ref.title = e}
						Locale={this.state.Locale}
						current={this.state.current}
						onHidden={() => {
							this.Unmount('title');
						}} />
					: null}
			</div>
			: null
	}
}
export default App;