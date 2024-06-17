import React from 'react';
import Floating from './Floating';
import { ReactComponent as Logo } from '../../assets/images/portfolio.svg';

class Cover extends React.Component {
	render() {
		return <div className={'cover'
			+ (this.props.className ? ' ' + this.props.className : '')}>
			<Floating
				className="position-absolute top-0 bottom-0 start-0 end-0 p-10 p-md-20"
				ratioX={130}
				ratioY={130}>
				<img src={process.env.PUBLIC_URL + '/images/marco-d-cellamare.png'}
					alt={this.props.Locale.com.NAME}
					loading="lazy"
					className="object-fit-contain w-100 h-100 opacity-70" />
			</Floating>
			<div className="row position-relative">
				<div className="col-12 col-md-auto text-center text-md-end align-self-center mb-5 mb-md-0">
					<h5 className="my-0 text-uppercase lh-1">
						{this.props.Locale.com.THE}
					</h5>
				</div>
				<Floating
					className="col-12 col-md-4 text-center align-self-center"
					classNameChildren="w-80 w-sm-70 w-md-auto"
					ratioX={65}
					ratioY={65}>
					<Logo />
				</Floating>
				<div className="col-12 col-md text-center text-md-start align-self-center mt-5 mt-md-0">
					<h5 className="mt-0 mb-1 text-uppercase lh-1">
						{this.props.Locale.com.OF.toLowerCase()}
						{' '}
						<strong className="text-success">
							{this.props.Locale.com.NAME}
						</strong>
					</h5>
					<h6 className="small my-0 text-uppercase">
						{this.props.Locale.com.ROLE}
					</h6>
				</div>
			</div>
		</div>
	}
}
export default Cover;