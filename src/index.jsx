import ReactDOMClient from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga4';

import Config from './config.json';
import Location from './app/components/Router/Location';
import App from './app';

ReactGA.initialize(Config.ANALYTICS);
ReactDOMClient.createRoot(document.getElementById('root')).render(
	<Router>
		<Location>
			<App />
		</Location>
	</Router>
);
