import { Trans, useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import { HeartIcon } from 'lucide-react';
import Background from './Background';
import Menu from './Menu';
import Toggler from './Toggler';
import Title from './Title';
import Counter from '@/app/misc/Counter';

import pkg from '@package';

const Nav = () => {
	const spacing = useUIStore((state) => state.spacing);
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const pageTheme = useUIStore((state) => state.pageTheme);
	const overPageTheme = useUIStore((state) => state.overPageTheme);
	const { t } = useTranslation();

	return (
		<nav
			data-theme={overPageTheme ?? pageTheme}
			className='absolute top-0 left-0 right-0 bottom-0'>
			<Background />
			<div
				className={classNames([
					'absolute top-0 left-0 right-0 bottom-0 flex overflow-x-hidden overflow-y-auto scrollbar',
					'transition-[translate] duration-500 ease-in-out ',
					isNavOpened
						? 'translate-x-0 delay-300'
						: '-translate-x-full',
				])}>
				<div
					className={classNames([
						'flex flex-col gap-5 lg:gap-10 w-5/6 md:w-2/3',
						spacing.nav,
					])}>
					<Menu />
					<div className='min-w-50 min-h-15 flex items-end w-full lg:max-w-1/2'>
						<Counter
							date={new Date(t('counter.experience'))}
							sentenceLike={true}
							className='uppercase font-black text-(--color-theme-link-active) h6 text-xs md:text-sm transition-[color] duration-250 ease-in-out pointer-events-none'
							suffxClassName='text-nowrap'
							suffx={`${t(
								'counter.ofExperience'
							).toLowerCase()}.`}
						/>
					</div>
					<div className='min-w-50 text-xs text-(--color-theme-link-active) transform-[color] duration-200 ease-in-out'>
						<strong>{`v${pkg.version}`}</strong>
						<br />
						<Trans
							i18nKey='copyright'
							components={{
								love: (
									<HeartIcon className='text-svg fill-(--color-theme-link) stroke-(--color-theme-link)' />
								),
							}}
						/>
					</div>
				</div>
			</div>
			<div
				className={classNames([
					'absolute top-0 left-0 mix-blend-difference',
					spacing.absEdge,
				])}>
				<Toggler />
				<Title />
			</div>
		</nav>
	);
};
export default Nav;
