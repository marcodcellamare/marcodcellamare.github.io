import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FirebaseContext } from './context';

import { useTranslation } from 'react-i18next';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';

import pkg from '@package';

interface FirebaseProviderProps {
	children: ReactNode;
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
	const { i18n } = useTranslation();

	const [analytics, setAnalytics] = useState<Analytics | null>(null);

	const firebaseApp = useMemo<FirebaseApp>(() => {
		return getApps().length === 0
			? initializeApp(firebaseConfig)
			: getApps()[0];
	}, []);

	const logEvent = useCallback(
		async (eventName: string, params?: Record<string, any>) => {
			if (!analytics) return;

			const { logEvent } = await import('firebase/analytics');

			try {
				logEvent(analytics, eventName, {
					...params,
					prod: import.meta.env.PROD,
				});
			} catch (err) {
				if (import.meta.env.DEV)
					console.warn(
						`Analytics: Failed to log event "${eventName}"`,
						err
					);
			}
		},
		[analytics]
	);

	useEffect(() => {
		(async () => {
			const { getAnalytics, isSupported, setUserProperties } =
				await import('firebase/analytics');

			if (await isSupported()) {
				const analytics = getAnalytics(firebaseApp);

				setUserProperties(analytics, {
					app_version: `${pkg.version}${
						import.meta.env.DEV ? '.dev' : ''
					}`,
					locale: i18n.language,
					user_role: import.meta.env.DEV
						? 'development'
						: 'production',
				});
				setAnalytics(analytics);
			}
		})();
	}, [firebaseApp, i18n.language]);

	return (
		<FirebaseContext.Provider
			value={{
				app: firebaseApp,
				analytics,
				logEvent,
			}}>
			{children}
		</FirebaseContext.Provider>
	);
};
