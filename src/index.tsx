import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ResizeProvider } from './contexts/resize';

import App from './app/index';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import './locales/i18n';
import '!/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<ResizeProvider>
				<App />
			</ResizeProvider>
		</HashRouter>
	</StrictMode>
);
