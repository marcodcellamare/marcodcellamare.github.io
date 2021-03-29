import React, { setState } from 'react';
import Router from './Router';

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = { className: '' };
		this.changeClassName = this.changeClassName.bind(this);
	}
	changeClassName(className) {
		this.setState({ className: className });
	}
	render() {
		return <article className={this.props.className + (this.state.className ? ' ' + this.state.className : '')}>
			<Router changeClassName={this.changeClassName} />
		</article>
	}
}

export default Article;