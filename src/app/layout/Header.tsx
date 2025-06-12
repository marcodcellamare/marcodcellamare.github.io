import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Nav from './nav';
import Toggler from './nav/Toggler';
import Loader from './nav/Loader';

const Header = () => {
	const { isNavOpened } = useSettings();

	return (
		<header
			className={classNames([
				'absolute top-0 bottom-0 left-0 right-0',
				{
					'pointer-events-none': !isNavOpened,
				},
			])}>
			<Loader />
			<Nav />
			<Toggler />
		</header>
	);
};
export default Header;
