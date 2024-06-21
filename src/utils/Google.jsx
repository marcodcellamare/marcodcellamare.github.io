import { useEffect } from 'react';
import { load as GoogleFontLoader } from 'google-fonts-loader';
import ReactGA from 'react-ga4';

import Config from '../config.json';

const Google = (props) => {
	useEffect(() => {
		let fonts = [];

		Config.FONTS.forEach((f) => {
			f.weights.forEach((w) => {
				fonts.push({ family: f.family, wght: w });

				if (f.italic)
					fonts.push({ family: f.family, wght: w, ital: 1 });
			});
		});
		if (fonts.length > 0) GoogleFontLoader(fonts);

		ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
	});
	return props.children;
};
export default Google;
