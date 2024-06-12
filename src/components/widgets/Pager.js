import React from 'react';
import { Floating } from './';

class Pager extends React.Component {
	render() {
		return <Floating
			scrollable={this.props.main}
			className={'pager pager-' + (this.props.slide < 8 ? this.props.slide + 1 : 'all')}
			ratioY={3}>
			<div className="pager-wrapper">
				<div className="pager-polygon" />
			</div>
		</Floating>
	}
}
export default Pager;