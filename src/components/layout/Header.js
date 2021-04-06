import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Config from '../../assets/config.json';
import Locale from '../../assets/languages';

class Header extends React.Component {
	render() {
		return <header className={this.props.className}>
			<Navbar bg="light" expand="lg" className="w-100">
				<Navbar.Brand as={NavLink} to="/" replace>{Config.NAME}</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to="/designer" replace activeClassName="active">{Locale.NAV.DESIGNER}</Nav.Link>
						<Nav.Link as={NavLink} to="/developer" replace activeClassName="active">{Locale.NAV.DEVELOPER}</Nav.Link>
						<Nav.Link as={NavLink} to="/about" replace activeClassName="active">{Locale.NAV.ABOUT}</Nav.Link>
						<Nav.Link as={NavLink} to="/contacts" replace activeClassName="active">{Locale.NAV.CONTACTS}</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>;
	}
}

export default Header;
