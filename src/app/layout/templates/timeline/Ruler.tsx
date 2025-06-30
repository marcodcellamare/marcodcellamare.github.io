import classNames from 'classnames';

interface RulerProps {
	activeIdx?: number;
	totalSlides?: number;
}

const Ruler = ({ activeIdx = 0, totalSlides = 0 }: RulerProps) => {
	if (totalSlides < 2) return null;

	return (
		<div className='absolute top-2/3 left-0 right-0 h-[0.1rem] bg-[var(--color-link)] hidden lg:flex justify-between items-center pointer-events-none'>
			{new Array(totalSlides + 2).fill(false).map((_, k) => (
				<div
					key={k}
					className={classNames([
						'w-[0.1rem] transform-[height] duration-500 delay-150 ease-in-out',
						k !== activeIdx + 1 ? 'h-3' : 'h-100',
						k > 0 && k < totalSlides + 2 - 1
							? 'bg-[var(--color-link)]'
							: 'transparent',
					])}
				/>
			))}
		</div>
	);
};
export default Ruler;
