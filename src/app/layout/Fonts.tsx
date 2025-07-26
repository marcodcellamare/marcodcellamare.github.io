import config from '@config';

const Fonts = () =>
	config.fonts.map((font, k) => (
		<link
			key={k}
			href={`https://fonts.googleapis.com/css2?family=${font.family}:${
				font.italic ? 'ital,' : ''
			}wght@${font.weights.join(';')}&display=swap`}
			rel='stylesheet'
			precedence='default'
		/>
	));
export default Fonts;
