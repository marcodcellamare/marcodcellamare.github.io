import { MouseEventHandler } from 'react';
import '@styles/components/NavToggler.scss';

const Toggler = ({
	active,
	onClick,
}: {
	active: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<button
			className={`nav-toggler${
				active ? ' active' : ''
			} position-fixed top-0 start-0 btn btn-link p-0 link-success link-underline-opacity-0 m-3 m-md-8`}
			onClick={onClick}>
			<div className='nav-toggler-icon'>
				<span />
				<span />
				<span />
			</div>
		</button>
	);
};
export default Toggler;
