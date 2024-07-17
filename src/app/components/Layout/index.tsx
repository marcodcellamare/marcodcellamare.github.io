import { useState } from 'react';
import { TemplateProvider } from '@components/Provider/Template';
import Nav from '@components/Nav';
import NavToggler from '@components/Nav/Toggler';
import Main from './Main';
import Footer from './Footer';
import RoutesTreeInterface from '@interfaces/routesTree';

const Layout = ({ route }: { route: RoutesTreeInterface }) => {
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
		<TemplateProvider routeId={route.id}>
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
		</TemplateProvider>
	);
};
export default Layout;
