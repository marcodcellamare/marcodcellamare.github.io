import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Page from '.';

function Router(props) {
	let location = useLocation();

	useEffect(() => {
		let path = location.pathname.replace(/\//g, '_');
		props.changeClassName(path);
	}, [location]);

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={location.key}
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