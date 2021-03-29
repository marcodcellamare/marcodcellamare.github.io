import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Config from './assets/config.json';
import { Header, Footer } from './components/layout';
import Article from './components/pages/Article';
import './assets/scss/main.scss';

class App extends React.Component {
	render() {
		return <div className='app d-flex flex-column'>
			<BrowserRouter>
				<Header className="d-flex" />
				<Article className="d-flex" />
			</BrowserRouter>
			<Footer className="d-flex" />
		</div>
	}
	componentDidMount(prevProps) {
		document.documentElement.lang = Config.LOCALE_HTML;
	}
}


export default App;