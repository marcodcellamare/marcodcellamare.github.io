import { useTranslation } from 'react-i18next';
import Counter from '../Elements/Counter';
import { CounterTemplate as CounterTemplateInterface } from '@interfaces/template/counter';

const Counters = ({
	id,
	routeId,
	className = '',
	items = [],
}: {
	id: number;
	routeId: string;
	className?: string;
	items?: CounterTemplateInterface[];
}) => {
	const { i18n } = useTranslation();

	return items.length > 0 ? (
		<div className={`section-counters ${className}`.trim()}>
			<div className='row g-1'>
				{items.map((item, k) => {
					return (
						<div
							key={k}
							className={`col-12 d-flex flex-grow-1 ${
								item.classNameWrapper || ''
							}`.trim()}>
							{i18n.exists(
								`page.${routeId}:sections.${id}.counters.${k}.TITLE`
							) ? (
								<h3 className='section-counters-title my-0'>
									{i18n.t(
										`page.${routeId}:sections.${id}.counters.${k}.TITLE`
									)}
								</h3>
							) : null}
							<Counter
								since={item.since}
								showOnly={item.showOnly}
								newLineAt={item.newLineAt}
								className={item.className}
								classNamePre={item.classNamePre}
								classNamePost={item.classNamePost}
								prefx={i18n.t(
									`page.${routeId}:sections.${id}.counters.${k}.PREFX`
								)}
								suffx={i18n.t(
									`page.${routeId}:sections.${id}.counters.${k}.SUFFX`
								)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	) : null;
};
export default Counters;
