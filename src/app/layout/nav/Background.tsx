import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

const Background = () => {
	const { pageTheme, overTheme, isNavOpened } = useSettings();

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0'>
			{new Array(3).fill(false).map((_, k) => (
				<div
					key={k}
					data-theme={overTheme ?? pageTheme}
					className={classNames([
						'bg-theme opacity-95 h-1/3 transition-[width,background-color] duration-700 ease-in-out',
						!isNavOpened ? 'w-0' : 'w-[calc(100vw-0.25rem)]',
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
					])}
				/>
			))}
		</div>
	);
};
export default Background;
