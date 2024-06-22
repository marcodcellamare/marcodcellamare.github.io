import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as BrowserRouter } from 'react-router-dom';

import Location from './app/components/Router/Location';
import Google from './utils/Google';

import App from './app';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<>
		<Google />
		<BrowserRouter>
			<Location>
				<App />
			</Location>
		</BrowserRouter>
	</>
);
