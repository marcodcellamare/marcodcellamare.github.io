import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Moods from './elements/moods';
import Container from './elements/Container';
import Socials from './elements/socials';

const Footer = () => {
	const { spaceRef, activeSectionTheme } = useSettings();

	return (
		<footer
			data-theme={activeSectionTheme}
			className={classNames([
				'absolute bottom-0 left-0 right-0 text-[var(--color-content)] text-xl md:text-lg',
				spaceRef.current.footer,
			])}>
			<div className='absolute bottom-0 left-0 right-0 h-[200%] pointer-events-none bg-linear-to-t from-black/15 to-black/0' />
			<Container className='flex flex-col md:flex-row gap-2 md:items-center relative'>
				<Socials className='md:ml-auto' />
				<div className='flex-1 min-w-0 md:order-first'>
					<Moods />
				</div>
			</Container>
		</footer>
	);
};
export default Footer;
