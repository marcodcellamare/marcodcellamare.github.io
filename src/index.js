import ReactDOMClient from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Location } from './components/widgets';
import App from './components/App';

ReactDOMClient
	.createRoot(document.getElementById('root'))
	.render(<Router>
		<Location>
			<App />
		</Location>
	</Router>);