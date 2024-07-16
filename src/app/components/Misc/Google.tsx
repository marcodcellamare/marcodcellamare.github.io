import { Helmet } from 'react-helmet-async';
import { load as GoogleFontLoader } from 'google-fonts-loader';
import Config from '@config';

interface Fonts {
	family: string;
	wght: number;
	ital?: 0 | 1;
}
const Google = () => {
	// Get all the Google Fonts from the config file

	let fonts: Fonts[] = [];

	Config.fonts.forEach((f) => {
		f.weights.forEach((w) => {
			fonts.push({ family: f.family, wght: w });

			if (f.italic) fonts.push({ family: f.family, wght: w, ital: 1 });
		});
	});

	// Load Google Fonts

	if (fonts.length > 0) GoogleFontLoader(fonts);

	// Return the preload link for the html <head> (use inside Helmet)

	return (
		<Helmet>
			{Config.preload &&
				Config.preload.map((options, k) => {
					Object.keys(options).forEach((attr) => {
						Object.keys(process.env).forEach((key) => {
							options[attr] = options[attr].replace(
								`%${key}%`,
								process.env[key]
							);
						});
					});
					return (
						<link
							key={k}
							{...options}
						/>
					);
				})}
		</Helmet>
	);
};
export default Google;
