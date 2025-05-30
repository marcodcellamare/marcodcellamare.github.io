import Nav from './nav';
import Toggler from './nav/Toggler';

const Header = () => (
	<header className='absolute top-0 bottom-0 left-0 right-0 pointer-events-none'>
		<Nav />
		<Toggler />
	</header>
);
export default Header;
