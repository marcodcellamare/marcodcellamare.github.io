import React from 'react';
import Config from '../../assets/config.json';

class About extends React.Component {
	render() {
		return <div className="article">This is about me</div>;
	}
	componentDidMount() {
		document.title = 'About - ' + Config.NAME;
	}
}

export default About;
