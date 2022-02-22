import React from 'react';
import Router from '../Router';

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = { className: '' };
		this.app = false;
		this.SetClassName = this.SetClassName.bind(this);
	}
	componentDidMount() {
		this.app = document.querySelector('.app');
	}
	SetClassName(className) {
		this.setState({ className: className });

		this.app.className = this.app.className.replace(/\barticle_.*?\b/g, '');
		this.app.classList.add('article' + className);
	}
	render() {
		return <article className={this.props.className + (this.state.className ? ' ' + this.state.className : '')}>
			<Router SetClassName={this.SetClassName} />
		</article>
	}
}

export default Article;