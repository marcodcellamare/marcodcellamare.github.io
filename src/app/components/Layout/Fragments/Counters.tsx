import { useTranslation } from 'react-i18next';
import { Counter } from '@components/Misc';
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
			{items.map((item, k) => {
				return (
					<div
						key={k}
						className='row'>
						<div className='col-12'>
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
					</div>
				);
			})}
		</div>
	) : null;
};
export default Counters;

/*
import React from 'react';

import { Counter } from '../../../components/Misc';

class Counters extends React.Component {
	render() {
		return this.props._ && this.props._.length > 0 ? (
			<div
				className={
					'section-counters' +
					(this.props.className ? ' ' + this.props.className : '')
				}>
				<div className='row'>
					{this.props._.map((counter, k) => {
						return (
							<div
								key={k}
								className={
									'col-12' +
									(counter.colClassName
										? ' ' + counter.colClassName
										: '')
								}>
								{counter.TITLE ? (
									<h3 className='mt-0 mb-3'>
										{counter.TITLE}
									</h3>
								) : null}
								<Counter
									Locale={this.props.Locale}
									className={counter.className}
									classNamePreBr={counter.classNamePreBr}
									classNamePostBr={counter.classNamePostBr}
									since={counter.since}
									br={counter.br}
									prefx={counter.PREFX}
									suffx={counter.SUFFX}
								/>
							</div>
						);
					})}
				</div>
			</div>
		) : null;
	}
}
export default Counters;
*/
