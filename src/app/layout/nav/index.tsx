import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Container from '../elements/Container';
import Background from './Background';
import Menu from './Menu';

const Nav = () => {
	const { isNavOpened } = useSettings();

	return (
		<nav className='absolute top-0 left-0 right-0 bottom-0'>
			<Background />
			<div
				className={classNames([
					'absolute top-0 left-0 right-0 bottom-0 flex overflow-x-hidden overflow-y-auto scrollbar',
					'transition-[translate] duration-500 ease-in-out',
					isNavOpened
						? 'translate-x-0 delay-300'
						: '-translate-x-full',
				])}>
				<Container className='flex flex-col py-20'>
					<h1 className='h4 text-secondary'>xxx</h1>
					<Menu />
				</Container>
			</div>
		</nav>
	);
};
export default Nav;
