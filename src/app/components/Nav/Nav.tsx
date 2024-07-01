import {
	MouseEventHandler,
	useEffect,
	TransitionEvent,
	useState,
	useRef,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashLg } from 'react-bootstrap-icons';
import { tree as routeTree, paths as routePaths } from '@components/Router';
import Config from '@config';
import RoutesTreeInterface from '@interfaces/routesTree';
import '@styles/components/Nav.scss';

const Nav = ({
	active,
	onClick,
	onFadeOut,
}: {
	active: boolean;
	onClick: MouseEventHandler<HTMLAnchorElement>;
	onFadeOut: Function;
}) => {
	const { i18n } = useTranslation();
	const nav: RoutesTreeInterface[] = [Config.NAV];
	const [show, setShow] = useState<boolean>(false);
	let timer = useRef(null);
	let navCounter: number = 0;

	useEffect(() => {
		// Use internal state to delay the class
		// being attached and so, have the transition

		clearTimeout(timer.current);
		timer.current = setTimeout(() => setShow(active), !show ? 100 : 10);

		return () => clearTimeout(timer.current);
	}, [active, show]);

	const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
		if (!active && e.propertyName === 'opacity') onFadeOut();
	};

	return (
		<nav
			className={`nav${
				show ? ' show' : ''
			} d-flex position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden`}
			onTransitionEnd={onTransitionEnd}>
			<div className='container d-flex flex-grow-1'>
				<div className='row flex-grow-1 align-self-center'>
					<div className='col'>
						<ul className='nav-menu list-unstyled h1 display-2 fw-bold lh-1'>
							{routeTree(routePaths(nav)).map(
								(route: RoutesTreeInterface, k: number) => {
									if (!route.hidden) navCounter++;

									return !route.hidden ? (
										<li
											key={k}
											style={{
												// Delay for the entrance animation
												transitionDelay:
													navCounter / 10 + 's',

												// Smaller size for deeper items
												fontSize:
													(route.deep > 1
														? Math.round(
																100 -
																	(route.deep -
																		1) *
																		15
														  )
														: 100) + '%',
											}}>
											<NavLink
												to={route.path}
												className={({ isActive }) => {
													return `d-block${
														isActive
															? ' active'
															: ''
													} position-relative text-nowrap`;
												}}
												onClick={onClick}>
												{route.deep > 1 ? (
													// Add icon on deeper items
													<>
														{[
															...Array(
																route.deep - 1
															),
														].map(() => (
															<DashLg />
														))}
													</>
												) : null}
												{i18n.t(`nav.${route.id}`)}
											</NavLink>
										</li>
									) : null;
								}
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Nav;
