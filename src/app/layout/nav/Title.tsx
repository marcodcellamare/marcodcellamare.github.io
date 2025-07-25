import { useUIStore } from '@/stores/useUIStore';
import { useTranslation } from 'react-i18next';
import { useScroll } from '@/contexts/scroll';
import classNames from 'classnames';

const Title = () => {
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const { isWheeling } = useScroll();
	const { t } = useTranslation();

	return (
		<h6
			className={classNames([
				'absolute left-full top-1/2 -translate-y-1/2 pl-2 md:pl-5 hidden sm:block pointer-events-none',
				'font-black uppercase text-nowrap',
				'origin-[-1.75rem_center] md:origin-[-1.5rem_center] overflow-hidden',
				'transition-[max-width,rotate,font-size] duration-500 ease-in-out',
				!isWheeling || isNavOpened ? 'max-w-[100vh]' : 'max-w-[0vh]',
				!isNavOpened ? 'rotate-90 text-xxs' : 'rotate-0 text-xs',
			])}>
			<div className='bg-(--color-palette-gray)'>
				<div className='py-2 px-3 text-(--color-palette-gray) mix-blend-difference'>
					{t('title')}
				</div>
			</div>
		</h6>
	);
};
export default Title;
