import React from 'react';
import Config from '../../assets/config.json';
import Locale from '../../assets/languages';

class Page404 extends React.Component {
	render() {
		return <div className="article">{Locale.PAGE404.TITLE}</div>;
	}
	componentDidMount() {
		document.title = '404 - ' + Config.NAME;

		console.log('404')
	}
}

export default Page404;
