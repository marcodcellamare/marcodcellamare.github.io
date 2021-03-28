import React from 'react';
import Config from '../../assets/config.json';

class Home extends React.Component {
	render() {
		return <div className="article">This is the home</div>;
	}
	componentDidMount() {
		document.title = Config.NAME;
	}
}

export default Home;
