import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Config from './assets/config.json';
import { Header, Footer } from './components/layout';
import { Home, About, Page404 } from './components/pages';
import './App.scss';

class App extends React.Component {
	render() {
		return <div className='app d-flex flex-column'>
			<BrowserRouter>
				<Header className="d-flex" />
				<article className="d-flex">
					<Router />
				</article>
			</BrowserRouter>
			<Footer className="d-flex" />
		</div>
	}
	componentDidMount() {
		document.documentElement.lang = Config.LOCALE_HTML;
	}
}
function Router() {
	let location = useLocation();

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={location.key}
				classNames="fade"
				timeout={300}>
				<Switch location={location}>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/about2' component={About} />
					<Route path="*" component={Page404} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
	)
}

export default App;
