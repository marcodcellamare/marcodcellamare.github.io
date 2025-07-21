import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RouterProvider } from './contexts/router';
import { FirebaseProvider } from './contexts/firebase';
import { SettingsProvider } from './contexts/settings';
import { ScrollProvider } from './contexts/scroll';
import { DevUtilitiesProvider } from './contexts/dev-utilities';
import { ResizeProvider } from './contexts/resize';
import { ParallaxProvider } from './contexts/parallax';

import App from './app/index';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import './locales/i18n';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<RouterProvider>
				<FirebaseProvider>
					<SettingsProvider>
						<ScrollProvider>
							<ResizeProvider>
								<ParallaxProvider>
									<DevUtilitiesProvider>
										<App />
									</DevUtilitiesProvider>
								</ParallaxProvider>
							</ResizeProvider>
						</ScrollProvider>
					</SettingsProvider>
				</FirebaseProvider>
			</RouterProvider>
		</HashRouter>
	</StrictMode>
);
