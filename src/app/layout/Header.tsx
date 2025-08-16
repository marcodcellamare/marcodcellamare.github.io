import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import Nav from './Nav';
import Loader from './Nav/Loader';
import MiniMap from './elements/MiniMap';

const Header = () => {
	const isNavOpened = useUIStore((state) => state.isNavOpened);

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
