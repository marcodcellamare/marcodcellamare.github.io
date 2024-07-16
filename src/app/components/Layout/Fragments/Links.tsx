import { useTranslation } from 'react-i18next';
import { Link } from '@components/Misc';
import '@styles/components/Links.scss';

const Links = ({ className = '' }: { className?: string }) => {
	const { i18n } = useTranslation();

	return (
		<>
			{Object.keys(i18n.t('info:links', { returnObjects: true })).map(
				(type, k) => {
					return (
						<ul
							key={k}
							className={`links links-${k} links-${type} list-inline d-inline-block my-0 ${className}`.trim()}>
							<li className='list-inline-item'>
								<p className='small fw-bold text-success my-0'>
									{i18n.t(`com:${type.toUpperCase()}`, {
										count: Object.keys(
											i18n.t(`info:links.${type}`, {
												returnObjects: true,
											})
										).length,
									})}
								</p>
							</li>
							{Object.keys(
								i18n.t(`info:links.${type}`, {
									returnObjects: true,
								})
							).map((subType, kk) => {
								return (
									<li
										key={kk}
										className='list-inline-item'>
										<Link
											type={subType}
											label={i18n.t(
												`com:${subType.toUpperCase()}`
											)}
											href={i18n.t(
												`info:links.${type}.${subType}`
											)}
											className='link-success'
											classNameLabel='bg-danger text-dark'
										/>
									</li>
								);
							})}
						</ul>
					);
				}
			)}
		</>
	);
};
export default Links;
