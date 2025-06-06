import { useSettings } from '!/contexts/settings';

import Moods from './moods';
import Container from './elements/Container';

const Footer = () => {
	const { pageTheme } = useSettings();

	return (
		<footer
			data-theme={pageTheme}
			className='py-3 md:py-5 bg-base-200 text-base-content'>
			<Container>
				<Moods />
			</Container>
		</footer>
	);
};

export default Footer;
