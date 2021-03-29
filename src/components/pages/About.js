import React from 'react';
import Config from '../../assets/config.json';
import Locale from '../../assets/languages';

class About extends React.Component {
	render() {
		return <div className="article">{Locale.ABOUT.TITLE}</div>;
	}
	componentDidMount() {
		document.title = 'About - ' + Config.NAME;
	}
}

export default About;
