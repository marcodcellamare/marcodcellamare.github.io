import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RouterProvider } from './contexts/router';
import { FirebaseProvider } from './contexts/firebase';
import { SettingsProvider } from './contexts/settings';
import { ResizeProvider } from './contexts/resize';
import { ParallaxProvider } from './contexts/parallax';

import App from './app/index';

import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import './locales/i18n';
import '!/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<RouterProvider>
				<FirebaseProvider>
					<SettingsProvider>
						<ResizeProvider>
							<ParallaxProvider>
								<App />
							</ParallaxProvider>
						</ResizeProvider>
					</SettingsProvider>
				</FirebaseProvider>
			</RouterProvider>
		</HashRouter>
	</StrictMode>
);
