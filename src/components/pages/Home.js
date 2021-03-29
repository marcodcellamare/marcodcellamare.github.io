import React from 'react';
import Config from '../../assets/config.json';
import Locale from '../../assets/languages';

class Home extends React.Component {
	render() {
		return <div className="article">
			<div className="page-header">
				<h1>{Locale.HOME.TITLE}</h1>
			</div>
		</div>;
	}
	componentDidMount() {
		document.title = Config.NAME;
	}
}

export default Home;
