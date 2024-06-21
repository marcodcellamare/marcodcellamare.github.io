import React from 'react';
import { NavLink } from 'react-router-dom';

import Config from '../../../config.json';
import '../../../styles/components/Nav.scss';

class Nav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
		};
		this.component = 'nav';
		this.timeout = false;

		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.Show = this.Show.bind(this);
		this.Hide = this.Hide.bind(this);
	}
	componentDidMount() {
		this.Show();
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	onTransitionEnd(e) {
		if (
			e.target.classList.contains(this.component) &&
			e.propertyName === 'opacity'
		) {
			if (e.target.classList.contains('show')) {
				if (typeof this.props.onShown === 'function')
					this.props.onShown(this.component);
			} else {
				if (typeof this.props.onHidden === 'function')
					this.props.onHidden(this.component);
			}
		}
	}
	Show() {
		clearTimeout(this.timeout);

		this.timeout = setTimeout(() => {
			this.setState(
				{
					show: true,
				},
				() => {
					if (typeof this.props.onShow === 'function')
						this.props.onShow(this.component);
				}
			);
		}, 100);
	}
	Hide() {
		clearTimeout(this.timeout);

		this.setState(
			{
				show: false,
			},
			() => {
				if (typeof this.props.onHide === 'function')
					this.props.onHide(this.component);
			}
		);
	}
	render() {
		return Object.keys(Config.NAV).length > 1 ? (
			<nav
				className={
					'nav d-flex position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden' +
					(this.state.show ? ' show' : '')
				}
				onTransitionEnd={this.onTransitionEnd}>
				<div className='container d-flex flex-grow-1'>
					<div className='row flex-grow-1 align-self-center'>
						<div className='col'>
							<ul className='nav-menu list-unstyled h1 display-2 fw-bold lh-1'>
								{Object.keys(Config.NAV).map((path, k) => {
									return !Config.NAV[path].hide ? (
										<li
											key={k}
											style={{
												transitionDelay: k / 10 + 's',
											}}>
											<NavLink
												to={path}
												className={({ isActive }) => {
													return (
														'd-block position-relative text-nowrap' +
														(isActive
															? ' active'
															: '')
													);
												}}
												onClick={() => {
													this.Hide();
												}}>
												{this.props.Locale.nav[path]}
											</NavLink>
										</li>
									) : null;
								})}
							</ul>
						</div>
					</div>
				</div>
			</nav>
		) : null;
	}
}
export default Nav;
