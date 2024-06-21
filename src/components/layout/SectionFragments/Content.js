import React from 'react';

class Content extends React.Component {
	render() {
		return <div className={'section-content'
			+ (this.props.className ? ' ' + this.props.className : '')}>
			{this.props._.TITLE
				? this.props.slide === 0
					? <h1 className={'display-2 fw-bold'
						+ (this.props._.SUBTITLE
							|| this.props._.TEXT
							? ' mt-0 mb-5'
							: ' my-0')}
						dangerouslySetInnerHTML={{ __html: this.props._.TITLE }} />
					: <h2 className={'display-2 fw-bold'
						+ (this.props._.SUBTITLE
							|| this.props._.TEXT
							? ' mt-0 mb-5'
							: ' my-0')}
						dangerouslySetInnerHTML={{ __html: this.props._.TITLE }} />
				: null}
			{this.props._.SUBTITLE
				? <p className={'lead'
					+ (this.props._.TEXT
						? ' mt-0 mb-5'
						: ' my-0')}
					dangerouslySetInnerHTML={{ __html: this.props._.SUBTITLE }} />
				: null}
			{this.props._.TEXT
				? <p className="my-0"
					dangerouslySetInnerHTML={{ __html: this.props._.TEXT }} />
				: null}
		</div>
	}
}
export default Content;