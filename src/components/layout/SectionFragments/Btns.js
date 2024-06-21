import React from 'react';
import { IconLink } from '../../widgets';

class Btns extends React.Component {
	render() {
		return this.props._
			&& this.props._.length > 0
			? <div className={'section-btns'
				+ (this.props.className ? ' ' + this.props.className : '')}>
				{this.props._.map((btn, k) => {
					return <IconLink key={k}
						className={btn.className}
						Locale={this.props.Locale}
						iconOnly={false}
						type={btn.type}
						url={btn.url}>
						{btn.TEXT}
					</IconLink>
				})}
			</div>
			: null
	}
}
export default Btns;