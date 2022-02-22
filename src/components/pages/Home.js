import React from 'react';
import Config from '../../assets/config.json';
import Locale from '../../assets/languages';
import Counter from '../widgets/Counter';

class Home extends React.Component {
	render() {
		return <div className="article">
			<div className="page-header">
				<h1 className="text-uppercase">
					<span className="display-3">{Locale.HOME.TITLE}</span>
					<br />
					{Locale.HOME.SUBTITLE}
				</h1>
			</div>
			<Counter date="2002-08-01 09:00:00" tag="p" prefix={Locale.HOME.COUNTER_PREFIX} suffix={Locale.HOME.COUNTER_SUFFIX} />
		</div>
	}
	componentDidMount() {
		document.title = Config.NAME;
	}
}

export default Home;
