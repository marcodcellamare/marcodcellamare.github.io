import { useSettings } from '!/contexts/settings';
import { Trans, useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { HeartIcon } from 'lucide-react';
import Background from './Background';
import Menu from './Menu';
import Toggler from './Toggler';

import pkg from '!package';

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
				<div
					className={classNames([
						'flex flex-col gap-10 w-5/6 md:w-2/3',
						spaceRef.current.nav,
					])}>
					<Menu />
					<div className='text-[var(--color-heading)] transform-[color] duration-200 ease-in-out'>
						<h6 className='uppercase font-black mb-2'>
							{t('title')}
						</h6>
						<p className='text-xxs opacity-50'>
							{`v${pkg.version}`} —{' '}
							<Trans
								i18nKey='copyright'
								components={{
									love: (
										<HeartIcon className='text-svg-inline' />
									),
								}}
							/>
						</p>
					</div>
				</div>
			</div>
			<Toggler />
		</nav>
	);
};
export default Nav;
