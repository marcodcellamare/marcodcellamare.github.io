import { useSettings } from '!/contexts/settings';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Container from '../elements/Container';
import Background from './Background';
import Menu from './Menu';

const Nav = () => {
	const { pageTheme, overTheme, isNavOpened, spaceRef } = useSettings();
	const { t } = useTranslation();

	return (
		<nav
			data-theme={overTheme ?? pageTheme}
			className='absolute top-0 left-0 right-0 bottom-0'>
			<Background />
			<div
				className={classNames([
					'absolute top-0 left-0 right-0 bottom-0 flex overflow-x-hidden overflow-y-auto scrollbar',
					'transition-[translate] duration-500 ease-in-out',
					isNavOpened
						? 'translate-x-0 delay-300'
						: '-translate-x-full',
				])}>
				<Container
					className={classNames([
						'flex flex-col',
						spaceRef.current.nav,
					])}>
					<Menu />
					<h6 className='text-[var(--color-heading)] uppercase font-black'>
						{t('title')}
					</h6>
				</Container>
			</div>
		</nav>
	);
};
export default Nav;
