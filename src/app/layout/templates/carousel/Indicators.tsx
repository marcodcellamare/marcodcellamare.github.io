import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

interface IndicatorsProps {
	activeIdx?: number;
	totalSlides?: number;
}

const Indicators = ({ activeIdx = 0, totalSlides = 0 }: IndicatorsProps) => {
	const { spaceRef } = useSettings();

	if (totalSlides < 2) return null;

	return (
		<div
			className={classNames([
				'absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none z-110',
				spaceRef.current.absEdgePadding,
			])}>
			{Array.from({ length: totalSlides }).map((_, k) => (
				<div
					key={k}
					className={classNames([
						'w-1.5 bg-[var(--color-link)] transform-[height,opacity] duration-500 delay-150 ease-in-out rounded-full',
						k !== activeIdx
							? 'h-1.5 opacity-50'
							: 'h-10 opacity-100',
					])}
				/>
			))}
		</div>
	);
};
export default Indicators;
