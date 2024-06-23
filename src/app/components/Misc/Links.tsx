import React from 'react';

import { IconLink } from './';
import '../../../styles/components/Links.scss';

interface LinksProps {
	Locale: any;
	info: string;
}
const Links = ({ info, Locale }: LinksProps) => {
	return (
		<ul className='links list-inline d-inline-block my-0'>
			<li className='list-inline-item'>
				<p className='small fw-bold text-success mb-0'>
					{Locale.com[info.toUpperCase()]}
				</p>
			</li>
			{Object.keys(Locale.info[info]).map((type, kk) => {
				return (
					<li
						key={kk}
						className='list-inline-item'>
						<IconLink
							className='link-success'
							classNameTitle='bg-danger text-dark'
							Locale={Locale}
							iconOnly={true}
							type={type}
							url={Locale.info[info][type]}
						/>
					</li>
				);
			})}
		</ul>
	);
};
export default Links;
