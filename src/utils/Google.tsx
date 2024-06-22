import { useEffect } from 'react';
import { load as GoogleFontLoader } from 'google-fonts-loader';
import ReactGA from 'react-ga4';

import Config from '../config.json';

interface Fonts {
	family: string;
	wght: number;
	ital?: 0 | 1;
}
const Google = ({ children }: { children?: React.ReactNode }) => {
	const REACT_APP_ANALYTICS: string = process.env.REACT_APP_ANALYTICS || '';

	useEffect(() => {
		let fonts: Fonts[] = [];

		// Get all the Google Fonts from the config file

		Config.FONTS.forEach((f) => {
			f.weights.forEach((w) => {
				fonts.push({ family: f.family, wght: w });

				if (f.italic)
					fonts.push({ family: f.family, wght: w, ital: 1 });
			});
		});

		// Load Google Fonts

		if (fonts.length > 0) GoogleFontLoader(fonts);

		// Initialize Google Analytics

		ReactGA.initialize(REACT_APP_ANALYTICS);
	});
	return children;
};
export default Google;
