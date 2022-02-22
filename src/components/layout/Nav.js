import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
//import Config from '../../assets/config.json';
import N from '../../assets/data/nav.json';
//import Locale from '../../assets/languages';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Nav className={this.props.className}>
			{N.menu.map((n, i) => {
				return <Nav.Item key={n.link}>
					<Nav.Link as={NavLink} to={n.link} replace activeClassName="active">
						<small>{n.title}</small>
						<i class={n.icon}></i>
					</Nav.Link>
				</Nav.Item>
			})}
		</Nav>;
	}
}

export default Header;
