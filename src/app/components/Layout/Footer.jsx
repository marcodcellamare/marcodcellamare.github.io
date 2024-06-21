import React from 'react';

import { Love, IconLink } from '../Misc';
import '../../../styles/components/Footer.scss';

class Footer extends React.Component {
	render() {
		return (
			<footer className='bg-dark text-light py-5 py-md-10'>
				<div className='container'>
					<div className='row gx-5 g-md-10 d-flex'>
						<div className='col-12 col-md align-self-center text-truncate'>
							<Love
								className='mb-3 my-md-0'
								Locale={this.props.Locale}
							/>
						</div>
						{Object.keys(this.props.Locale.info).map((col, k) => {
							return (
								<div
									key={k}
									className='col-auto align-self-center'>
									<ul className='footer-links list-inline d-inline-block my-0'>
										<li className='list-inline-item'>
											<p className='small fw-bold text-success mb-0'>
												{
													this.props.Locale.com[
														col.toUpperCase()
													]
												}
											</p>
										</li>
										{Object.keys(
											this.props.Locale.info[col]
										).map((type, kk) => {
											return (
												<li
													key={kk}
													className='list-inline-item'>
													<IconLink
														className='link-success'
														classNameTitle='bg-danger text-dark'
														Locale={
															this.props.Locale
														}
														iconOnly={true}
														type={type}
														url={
															this.props.Locale
																.info[col][type]
														}
													/>
												</li>
											);
										})}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</footer>
		);
	}
}
export default Footer;
