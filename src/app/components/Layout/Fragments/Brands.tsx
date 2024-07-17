import { Brand } from '@components/Misc';
import '@styles/components/SectionBrands.scss';

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
						className='col-4 col-sm-3 col-lg-2 d-flex align-items-center justify-content-center'>
						<div className='section-brands-logo'>
							<Brand
								name={name}
								className='w-100 h-100'
							/>
							<h4 hidden={true}>{name}</h4>
						</div>
					</div>
				);
			})}
		</div>
	) : null;
};
export default Brands;
