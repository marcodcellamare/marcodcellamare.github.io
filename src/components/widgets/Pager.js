import React from 'react';

class Pager extends React.Component {
	render() {
		return <div className={'pager pager-' + (this.props.slide < 8 ? this.props.slide + 1 : 'all')}>
			<div className="pager-polygon" />
		</div>
	}
}
export default Pager;