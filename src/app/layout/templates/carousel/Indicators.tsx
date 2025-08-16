import classNames from 'classnames';

interface IndicatorsProps {
	activeIdx?: number;
	totalSlides?: number;
}

const Indicators = ({ activeIdx = 0, totalSlides = 0 }: IndicatorsProps) => (
	<div className='template-carousel-indicators flex flex-col gap-0.5 pointer-events-none'>
		{Array.from({ length: totalSlides }).map((_, k) => (
			<div
				key={k}
				className={classNames([
					'w-1.5 bg-(--color-theme-link) transform-[height,opacity] duration-500 delay-150 ease-in-out rounded-full',
					k !== activeIdx ? 'h-1.5 opacity-50' : 'h-10 opacity-100',
				])}
			/>
		))}
	</div>
);
export default Indicators;
