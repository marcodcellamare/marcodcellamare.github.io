import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import Moods from './elements/Moods';
import Container from './elements/Container';
import Socials from './elements/Socials';

const Footer = () => {
	const spacing = useUIStore((state) => state.spacing);
	const activeSectionTheme = useUIStore((state) => state.activeSectionTheme);
	const pageTheme = useUIStore((state) => state.pageTheme);

	return (
		<footer
			data-theme={activeSectionTheme}
			className={classNames([
				'absolute bottom-0 left-0 right-0 text-(--color-theme-content) text-xl md:text-lg pointer-events-none',
				'backdrop-blur-xs md:backdrop-blur-none',
				'transition-[color] duration-500 ease-in-out',
				spacing.footer,
			])}>
			<Container className='flex flex-col md:flex-row gap-2 md:items-center relative'>
				<div className='flex-1 min-w-0'>
					<Moods />
				</div>
				<Socials className='md:ml-auto' />
			</Container>
			<div
				data-theme={pageTheme}
				className='absolute left-0 right-0 bottom-0 h-1 bg-(--color-theme-background)'
			/>
		</footer>
	);
};
export default Footer;
