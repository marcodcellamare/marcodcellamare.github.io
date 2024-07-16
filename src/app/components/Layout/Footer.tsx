import { Love } from '@components/Misc';
import { Links } from './Fragments';

const Footer = () => {
	return (
		<footer className='bg-dark text-light py-5 py-md-10'>
			<div className='container'>
				<div className='row gx-5 g-md-10 d-flex'>
					<div className='col-12 col-md align-self-center text-truncate'>
						<Love className='mb-3 my-md-0' />
					</div>
					<div className='col-auto align-self-center'>
						<Links
							className={'mb-1 mb-md-0 ms-md-7 me-7 me-md-0'}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
