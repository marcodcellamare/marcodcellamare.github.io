import { Brand } from '@components/Misc';
import '@styles/components/Brands.scss';

const Brands = ({
	id,
	routeId,
	className = '',
	items = [],
}: {
	id: number;
	routeId: string;
	className?: string;
	items?: string[];
}) => {
	return items.length > 0 ? (
		<div className={`section-brands row ${className}`.trim()}>
			{items.map((name, k) => {
				return (
					<div
						key={k}
						className='col-4 col-sm-3 col-xxl-2 d-flex align-items-center justify-content-center'>
						<Brand
							name={name}
							className='w-100 h-100'
						/>
					</div>
				);
			})}
		</div>
	) : null;
};
export default Brands;
