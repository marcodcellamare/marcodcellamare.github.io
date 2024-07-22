import { useTranslation } from 'react-i18next';

const Lists = ({
	id,
	routeId,
	className = '',
	items = [],
}: {
	id: number;
	routeId: string;
	className?: string;
	items?: string[][];
}) => {
	const { i18n } = useTranslation();

	return items.length > 0 ? (
		<div className={`section-lists ${className}`.trim()}>
			{items.map((item, k) => {
				return (
					<div key={k}>
						{i18n.exists(
							`page.${routeId}:sections.${id}.lists.${k}.TITLE`
						) ? (
							<h3 className='h5 fw-bold'>
								{i18n.t(
									`page.${routeId}:sections.${id}.lists.${k}.TITLE`
								)}
							</h3>
						) : null}
						{i18n.exists(
							`page.${routeId}:sections.${id}.lists.${k}.TEXT`
						) ? (
							<p>
								{i18n.t(
									`page.${routeId}:sections.${id}.lists.${k}.TEXT`
								)}
							</p>
						) : null}
						{item.length > 0 ? (
							<ul className='list-inline small'>
								{item.map((i, kk) => {
									return (
										<li
											key={kk}
											className='list-inline-item'>
											{i}
										</li>
									);
								})}
							</ul>
						) : null}
					</div>
				);
			})}
		</div>
	) : null;
};
export default Lists;
