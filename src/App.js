import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Config from './assets/config.json';
import { Header, Footer } from './components/layout';
import Article from './components/layout/Article';
import './assets/scss/main.scss';

class App extends React.Component {
	render() {
		return <div className='app d-flex flex-column'>
			<Router>
				{/*<Header className="d-flex" />*/}
				<Article className="d-flex" />
			</Router>
			<Footer className="d-flex" />
		</div>
	}
	componentDidMount(prevProps) {
		document.documentElement.lang = Config.LOCALE_HTML;
	}
}

export default App;