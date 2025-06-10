import { createContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';

export interface FirebaseContextProps {
	app: FirebaseApp;
	analytics: Analytics | null;

	logEvent: (eventName: string, params?: Record<string, any>) => void;
}

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(
	undefined
);
