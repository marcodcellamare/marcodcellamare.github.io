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
