import React from 'react';
import Config from '../../assets/config.json';
import Locale from '../../assets/languages';
import Experience from '../widgets/Experience';

class Home extends React.Component {
	render() {
		return <div className="article">
			<div className="page-header">
				<h1>{Locale.HOME.TITLE}</h1>
			</div>
			<Experience date="2002-09-02 09:00:00" />
			<Experience date="2020-07-22 15:20:00" />
		</div>;
	}
	componentDidMount() {
		document.title = Config.NAME;
	}
}

export default Home;
