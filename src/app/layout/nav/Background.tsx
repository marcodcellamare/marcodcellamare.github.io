import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

const Background = () => {
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const pageTheme = useUIStore((state) => state.pageTheme);
	const overPageTheme = useUIStore((state) => state.overPageTheme);

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0'>
			{Array.from({ length: 3 }).map((_, k) => (
				<div
					key={k}
					data-theme={overPageTheme ?? pageTheme}
					className={classNames([
						'relative h-1/3 transition-[width] duration-700 ease-in-out',
						!isNavOpened ? 'w-0' : 'w-5/6 md:w-2/3',
						!isNavOpened
							? {
									'delay-100': k === 1,
									'delay-200': k === 2,
							  }
							: {
									'delay-300': k === 0,
									'delay-400': k === 1,
									'delay-500': k === 2,
							  },
					])}>
					<div
						className={classNames([
							'absolute top-0 bottom-0 left-0 right-0 bg-(--color-background) transition-[background-color] duration-300',
							{
								'delay-150': k === 1,
								'delay-300': k === 2,
							},
						])}
					/>
				</div>
			))}
		</div>
	);
};
export default Background;
