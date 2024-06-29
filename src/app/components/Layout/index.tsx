import { useState } from 'react';
import { useTemplate } from '@hooks';
import Nav from '@components/Nav/Nav';
import NavToggler from '@components/Nav/NavToggler';
import Main from './Main';
import Footer from './Footer';
import RoutesTreeInterface from '@interfaces/routesTree';

const Layout = ({ route }: { route: RoutesTreeInterface }) => {
	const template = useTemplate(route.id);
	const [navMounted, setNavMounted] = useState<boolean>(false);
	const [navOpened, setNavOpened] = useState<boolean>(false);

	if (template.length === 0) return null;

	// Function to mount and open / close the Nav component

	const onNavClick = () => {
		setNavOpened((prevNavOpened) => {
			if (!prevNavOpened) setNavMounted(true);

			return !prevNavOpened;
		});
	};

	return (
		<div className='app d-flex position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden'>
			<div className='d-flex flex-column flex-grow-1'>
				<Main
					route={route}
					template={template}
				/>
				<Footer />
			</div>
			{navMounted ? (
				<Nav
					active={navOpened}
					onClick={onNavClick}
					onFadeOut={() => setNavMounted(false)}
				/>
			) : null}
			<NavToggler
				active={navOpened}
				onClick={onNavClick}
			/>
		</div>
	);
};
export default Layout;
