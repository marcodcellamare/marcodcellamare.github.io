import React from 'react';
//
import { Love, Links } from '@components/Misc';

const Footer = () => {
	return (
		<footer className='bg-dark text-light py-5 py-md-10'>
			<div className='container'>
				<div className='row gx-5 g-md-10 d-flex'>
					<div className='col-12 col-md align-self-center text-truncate'>
						{/*
						<Love
							className='mb-3 my-md-0'
							Locale={props.Locale}
						/>
						*/}
						LOVE
					</div>
					{/*
					{Object.keys(props.Locale.info).map((info, k) => {
						return (
							<div
								key={k}
								className='col-auto align-self-center'>
								<Links
									Locale={props.Locale}
									info={info}
								/>
							</div>
						);
					})}
						*/}
					INFO
				</div>
			</div>
		</footer>
	);
};
export default Footer;
