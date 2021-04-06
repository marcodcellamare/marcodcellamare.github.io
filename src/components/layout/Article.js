import React from 'react';
import Router from '../Router';

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = { className: '' };
		this.SetClassName = this.SetClassName.bind(this);
	}
	SetClassName(className) {
		this.setState({ className: className });
	}
	render() {
		return <article className={this.props.className + (this.state.className ? ' ' + this.state.className : '')}>
			<Router SetClassName={this.SetClassName} />
		</article>
	}
}

export default Article;