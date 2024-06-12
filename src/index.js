import ReactDOMClient from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Config from './assets/config.json'
import { Location } from './components/widgets';
import App from './components/App';

ReactGA.initialize(Config.ANALYTICS);
ReactDOMClient
	.createRoot(document.getElementById('root'))
	.render(<Router>
		<Location>
			<App />
		</Location>
	</Router>);