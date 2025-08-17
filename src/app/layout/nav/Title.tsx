import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const Title = () => {
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const { t } = useTranslation();

	return (
		<h6
			className={classNames([
				'nav-title absolute left-full top-1/2 -translate-y-1/2 pl-0.5 hidden sm:block pointer-events-none contain-layout',
				'font-black uppercase text-nowrap',
				'origin-[calc(var(--spacing)*14/2*-1)_center] md:origin-[calc(var(--spacing)*12/2*-1)_center] overflow-hidden',
				'transition-[max-width,rotate,font-size] duration-500 ease-in-out',
				!isNavOpened ? 'rotate-90 text-xxs' : 'rotate-0 text-xs',
			])}
			aria-hidden={true}>
			<div className='bg-(--color-palette-gray)'>
				<div className='py-2 px-3 text-(--color-palette-gray) mix-blend-difference'>
					{t('title')}
				</div>
			</div>
		</h6>
	);
};
export default Title;
