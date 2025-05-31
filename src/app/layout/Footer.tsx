import { useSettings } from '!/contexts/settings';

import Moods from './moods';
import Container from './elements/Container';

const Footer = () => {
	const { theme } = useSettings();

	return (
		<footer
			data-theme={theme}
			className='py-3 md:py-5 bg-base-200 text-base-content'>
			<Container>
				<Moods />
			</Container>
		</footer>
	);
};

export default Footer;
