import React from 'react';

class Lists extends React.Component {
	render() {
		return this.props._ && this.props._.length > 0 ? (
			<div
				className={
					'section-lists' +
					(this.props.className ? ' ' + this.props.className : '')
				}>
				{this.props._.map((list, k) => {
					return (
						<div key={k}>
							{list.TITLE ? (
								<h3 className='h5'>{list.TITLE}</h3>
							) : null}
							{list.TEXT ? <p>{list.TEXT}</p> : null}
							{list._ && list._.length > 0 ? (
								<ul className='list-inline'>
									{list._.map((item, kk) => {
										return (
											<li
												key={kk}
												className='list-inline-item'>
												{typeof item === 'object'
													? item.TITLE
													: item}
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
	}
}
export default Lists;
