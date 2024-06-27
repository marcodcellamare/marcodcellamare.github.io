import { useEffect, useState } from 'react';
import { load as GoogleFontLoader } from 'google-fonts-loader';
import ReactGA from 'react-ga4';
import Config from '@config';

interface Fonts {
	family: string;
	wght: number;
	ital?: 0 | 1;
}
const useGoogleProvider = (): boolean => {
	const [google, setGoogle] = useState<boolean>(false);

	// Initialize Google Analytics

	const analytics = ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

	// Get all the Google Fonts from the config file

	let fonts: Fonts[] = [];

	Config.FONTS.forEach((f) => {
		f.weights.forEach((w) => {
			fonts.push({ family: f.family, wght: w });

			if (f.italic) fonts.push({ family: f.family, wght: w, ital: 1 });
		});
	});

	// Load Google Fonts

	const fontLoader = fonts.length > 0 ? GoogleFontLoader(fonts) : false;

	useEffect(() => {
		setGoogle(true);
	}, [analytics, fontLoader]);
	return google;
};
export default useGoogleProvider;
