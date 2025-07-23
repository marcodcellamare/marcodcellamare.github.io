import { useSettings } from '@/contexts/settings';
import { Trans, useTranslation } from 'react-i18next';
import { useScroll } from '@/contexts/scroll';
import classNames from 'classnames';

import { HeartIcon } from 'lucide-react';
import Background from './Background';
import Menu from './Menu';
import Toggler from './Toggler';

import pkg from '@package';

const Nav = () => {
	const { pageTheme, overTheme, isNavOpened, spaceRef } = useSettings();
	const { isScrolling } = useScroll();
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
				<div
					className={classNames([
						'flex flex-col gap-10 w-5/6 md:w-2/3',
						spaceRef.current.nav,
					])}>
					<Menu />
					<div className='text-xs text-(--color-heading)/50 transform-[color] duration-200 ease-in-out'>
						<strong>{`v${pkg.version}`}</strong>
						<br />
						<Trans
							i18nKey='copyright'
							components={{
								love: <HeartIcon className='text-svg' />,
							}}
						/>
					</div>
				</div>
			</div>
			<div
				className={classNames([
					'absolute top-0 left-0 mix-blend-difference',
					spaceRef.current.absEdge,
				])}>
				<Toggler />
				<h6
					className={classNames([
						'absolute left-full top-1/2 -translate-y-1/2 pl-2 md:pl-5 hidden sm:block pointer-events-none',
						'text-xxs lg:text-xs font-black uppercase text-nowrap',
						'origin-[-1.75rem_center] md:origin-[-1.5rem_center] overflow-hidden',
						'transition-[max-width,rotate] duration-500 ease-in-out',
						!isScrolling || isNavOpened
							? 'max-w-[100vh]'
							: 'max-w-[0vh]',
						!isNavOpened ? 'rotate-90' : 'rotate-0',
					])}>
					<div className='bg-(--color-palette-gray)'>
						<div className='py-2 px-3 text-(--color-palette-gray) mix-blend-difference'>
							{t('title')}
						</div>
					</div>
				</h6>
			</div>
		</nav>
	);
};
export default Nav;
