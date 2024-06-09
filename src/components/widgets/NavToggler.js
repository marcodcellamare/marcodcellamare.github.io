import React from 'react';

class NavToggler extends React.Component {
	render() {
		return <button
			className={'nav-toggler position-fixed btn btn-link p-0 link-success link-underline-opacity-0'
				+ (this.props.active ? ' active' : '')}
			onClick={this.props.onClick}>
			<div className="nav-toggler-icon">
				<span />
				<span />
				<span />
			</div>
		</button>
	}
}
export default NavToggler;