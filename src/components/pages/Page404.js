import React from 'react';
import Config from '../../assets/config.json';

class Page404 extends React.Component {
	render() {
		return <div className="article">404</div>;
	}
	componentDidMount() {
		document.title = '404 - ' + Config.NAME;

		console.log('404')
	}
}

export default Page404;
