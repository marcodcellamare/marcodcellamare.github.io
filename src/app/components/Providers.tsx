import { ReactNode, StrictMode } from 'react';
import { HashRouter } from 'react-router';
import { DevUtilitiesProvider } from '@/contexts/dev-utilities';
import { FirebaseProvider } from '@/contexts/firebase';
import { ParallaxProvider } from '@/contexts/parallax';
import { ResizeProvider } from '@/contexts/resize';
import { RouterProvider } from '@/contexts/router';
import { ScrollProvider } from '@/contexts/scroll';
import { SettingsProvider } from '@/contexts/settings';

const providers = [
	StrictMode,
	HashRouter,
	RouterProvider,
	FirebaseProvider,
	SettingsProvider,
	ScrollProvider,
	ResizeProvider,
	ParallaxProvider,
	DevUtilitiesProvider,
];

const Providers = ({ children }: { children: ReactNode }) =>
	providers.reduceRight((acc, Provider) => {
		return <Provider>{acc}</Provider>;
	}, children);

export default Providers;
