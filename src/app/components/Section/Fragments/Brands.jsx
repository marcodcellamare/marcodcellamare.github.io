import React from 'react';

import BrandIcons from '../../../../assets/images/brands';
import '../../../../styles/components/SectionBrands.scss';

class Brands extends React.Component {
	render() {
		return this.props._ && this.props._.length > 0 ? (
			<div
				className={
					'section-brands' +
					(this.props.className ? ' ' + this.props.className : '')
				}>
				<div className='row g-0'>
					{this.props._.map((brand, k) => {
						return (
							<div
								key={k}
								className='col-4 col-sm-3 col-lg-2 d-flex align-items-center justify-content-center'>
								<div className='section-brands-logo'>
									<BrandIcons
										className='w-100 h-100'
										logo={brand.logo}
										title={brand.NAME}
									/>
									<h3 hidden={true}>{brand.NAME}</h3>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		) : null;
	}
}
export default Brands;
