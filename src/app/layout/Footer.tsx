import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import Moods from './elements/moods';
import Container from './elements/Container';
import Socials from './elements/socials';

const Footer = () => {
	const spacing = useUIStore((state) => state.spacing);
	const activeSectionTheme = useUIStore((state) => state.activeSectionTheme);

	return (
		<footer
			data-theme={activeSectionTheme}
			className={classNames([
				'absolute bottom-0 left-0 right-0 text-(--color-theme-content) text-xl md:text-lg pointer-events-none transition-[color] duration-500 ease-in-out',
				spacing.footer,
			])}>
			<Container className='flex flex-col md:flex-row gap-2 md:items-center relative'>
				<div className='flex-1 min-w-0'>
					<Moods />
				</div>
				<Socials className='md:ml-auto' />
			</Container>
		</footer>
	);
};
export default Footer;
