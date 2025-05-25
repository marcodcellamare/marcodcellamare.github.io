import { useState } from 'react';
import Nav from './Nav';
import NavToggler from './Nav/Toggler';
import Main from './Main';
import Footer from './Footer';
import ItfRoutesTree from '@interfaces/routesTree';

const Layout = ({ route }: { route: ItfRoutesTree }) => {
	const [navMounted, setNavMounted] = useState<boolean>(false);
	const [navOpened, setNavOpened] = useState<boolean>(false);

	// Function to mount and open / close the Nav component

	const onNavTogglerClick = () => {
		setNavOpened((prevNavOpened) => {
			if (!prevNavOpened) setNavMounted(true);

			return !prevNavOpened;
		});
	};

	return (
		<div className='app d-flex position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden'>
			<div className='d-flex flex-column flex-grow-1'>
				<Main route={route} />
				<Footer />
			</div>
			{navMounted ? (
				<Nav
					active={navOpened}
					onClick={onNavTogglerClick}
					onFadeOut={() => setNavMounted(false)}
				/>
			) : null}
			<NavToggler
				active={navOpened}
				onClick={onNavTogglerClick}
			/>
		</div>
	);
};
export default Layout;
