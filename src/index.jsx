import ReactDOMClient from 'react-dom/client';
import { HashRouter as BrowserRouter } from 'react-router-dom';

import Location from './app/components/Router/Location';
import Google from './utils/Google';

import App from './app';

ReactDOMClient.createRoot(document.getElementById('root')).render(
	<Google>
		<BrowserRouter>
			<Location>
				<App />
			</Location>
		</BrowserRouter>
	</Google>
);
