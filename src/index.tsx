import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

// Initialize languages
import './locales/i18n';

import App from './app/index';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<HelmetProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</HelmetProvider>
);
