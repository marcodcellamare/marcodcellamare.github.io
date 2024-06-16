import React from 'react';

class NavToggler extends React.Component {
	render() {
		return <button
			className={'nav-toggler position-fixed top-0 start-0 btn btn-link p-0 link-success link-underline-opacity-0 m-3 m-md-8'
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