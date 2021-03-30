import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Page from './pages';

function Router(props) {
	let location = useLocation();
	let setClassName = props.setClassName;

	useEffect(() => {
		let path = location.pathname.replace(/\//g, '_');
		setClassName(path);
	}, [location, setClassName]);

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={location.pathname}
				classNames="fade"
				timeout={300}>
				<Switch location={location}>
					<Route exact path='/' component={Page.Home} />
					<Route exact path='/designer' component={Page.About} />
					<Route exact path='/developer' component={Page.About} />
					<Route exact path='/about' component={Page.About} />
					<Route exact path='/contacts' component={Page.About} />
					<Route path="*" component={Page.Page404} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
	);
}

export default Router;