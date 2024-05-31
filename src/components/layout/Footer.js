import React from 'react';
import { Love } from '../widgets';

class Footer extends React.Component {
	render() {
		return <footer className="bg-dark text-light py-15">
			<div className="container">
				<div className="row">
					<div className="col">
						<Love
							Locale={this.props.Locale} />
					</div>
					<div className="col-auto">
						x
					</div>
				</div>
			</div>
		</footer>
	}
}
export default Footer;