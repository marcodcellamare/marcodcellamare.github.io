import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Love from '../widgets/Love';

class Footer extends React.Component {
	render() {
		return <footer className={this.props.className}>
			<Container fluid className="py-3">
				<Row>
					<Col xs={8}>
						<Love />
					</Col>
					<Col xs={4}>
						x
					</Col>
				</Row>
			</Container>
		</footer>;
	}
}

export default Footer;
