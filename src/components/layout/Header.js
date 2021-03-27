import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
	render() {
		return <header>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand as={Link} to="/">Marco D. Cellamare</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to="/about">About</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>;
	}
}

export default Header;
