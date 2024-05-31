import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Config from '../assets/config.json';
import Locale from '../assets/languages';
import '../assets/scss/main.scss';
import { Footer, Header, Main } from './layout';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			language: Config.DEFAULT_LANGUAGE,
			Locale: {}
		};
		this.html = document.documentElement;
		this.Locale = new Locale();

		this.Init = this.Init.bind(this);
		this.Language = this.Language.bind(this);
	}
	componentDidMount() {
		this.Init();
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
	render() {
		return Object.keys(this.state.Locale).length > 0
			? <div className="app d-flex position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden">
				<div className="d-flex flex-column flex-grow-1">
					<Header
						Locale={this.state.Locale} />
					<Router>
						<Main
							Locale={this.state.Locale} />
					</Router>
					<Footer
						Locale={this.state.Locale} />
				</div>
			</div>
			: null
	}
}
export default App;