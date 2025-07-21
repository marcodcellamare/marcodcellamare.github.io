import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

import Nav from './nav';
import Loader from './nav/Loader';
import MiniMap from './elements/minimap';

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
			<MiniMap />
			<Loader />
			<Nav />
		</header>
	);
};
export default Header;
