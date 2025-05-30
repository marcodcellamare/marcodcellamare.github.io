import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import Background from './Background';

import Config from '!config';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	const { isNavOpened } = useRouter();

	return (
		<nav className='absolute top-0 bottom-0 left-0 w-8/10 border-2'>
			<Background />
			<div
				className={classNames([
					'relative p-10 transition-[translate] duration-500 ease-in-out',
					isNavOpened
						? 'translate-x-0 delay-300'
						: '-translate-x-full',
				])}>
				<ul>
					{(
						Object.keys(Config.pages.list) as Array<
							keyof typeof Config.pages.list
						>
					).map((pageId) =>
						!Config.pages.list[pageId].startsWith(
							Config.pages.hide
						) ? (
							<li key={pageId}>
								<NavLink
									to={Config.pages.list[pageId]}
									className={({ isActive }) =>
										classNames([
											'transition-[color,font-size] duration-200 ease-in-out',
											!isActive
												? 'h2 text-base-100'
												: 'h1 text-white',
										])
									}>
									{pageId}
								</NavLink>
							</li>
						) : null
					)}
				</ul>
			</div>
		</nav>
	);
};
export default Nav;
