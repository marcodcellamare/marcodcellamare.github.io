import Period from '../Elements/Period';
import { PeriodTemplate as PeriodTemplateInterface } from '@interfaces/template/period';

const Periods = ({
	id,
	routeId,
	className = '',
	items = [],
}: {
	id: number;
	routeId: string;
	className?: string;
	items?: PeriodTemplateInterface[];
}) => {
	return items.length > 0 ? (
		<div className={`section-periods ${className}`.trim()}>
			{items.map((item, k) => {
				return (
					<Period
						key={k}
						{...item}
						className='mb-5'
					/>
				);
			})}
		</div>
	) : null;
};
export default Periods;
