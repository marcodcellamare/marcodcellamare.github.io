import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Config from './assets/config.json';
import Firebase from './components/Firebase';
import { Header, Nav, Article, Footer } from './components/layout';

import './assets/scss/main.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.Firebase = false;
	}
	render() {
		return <div className='app d-flex flex-column'>
			<main>
				<Container fluid className="h-100">
					<Row className="h-100">
						<Router>
							<Col xs md={{ offset: 1 }} className="d-flex">
								<Article className="d-flex align-self-center" />
							</Col>
							<Col xs md="auto" className="d-flex justify-content-end">
								<Nav className="flex-column align-self-center text-right nav-custom-icons" />
							</Col>
							<Col md={1} className="d-none d-md-flex" />
						</Router>
					</Row>
				</Container>
			</main>
			<Footer className="d-flex" />
		</div>
	}
	componentDidMount() {
		document.documentElement.lang = Config.LOCALE_HTML;
		this.Firebase = new Firebase();


		//this.Firebase.LogEvent('test');
	}
}

export default App;