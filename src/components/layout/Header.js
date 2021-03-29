import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
	render() {
		return <header className={this.props.className}>
			<Navbar bg="light" expand="lg" className="w-100">
				<Navbar.Brand as={NavLink} to="/">Marco D. Cellamare</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to="/about" activeClassName='active'>About</Nav.Link>
						<Nav.Link as={NavLink} to="/about2" activeClassName='active'>About2</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>;
	}
}

export default Header;
