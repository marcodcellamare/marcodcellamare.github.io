import { createRoot } from 'react-dom/client';

import Providers from './app/components/Providers';
import App from './app/index';

import './locales/i18n';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<Providers>
		<App />
	</Providers>
);
