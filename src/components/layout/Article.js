import React from 'react';
import Router from '../Router';

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = { className: '' };
		this.setClassName = this.setClassName.bind(this);
	}
	setClassName(className) {
		this.setState({ className: className });
	}
	render() {
		return <article className={this.props.className + (this.state.className ? ' ' + this.state.className : '')}>
			<Router setClassName={this.setClassName} />
		</article>
	}
}

export default Article;