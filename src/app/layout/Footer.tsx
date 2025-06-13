import Moods from './elements/moods';
import Container from './elements/Container';
import Socials from './elements/socials';

const Footer = () => (
	<footer
		data-theme='white'
		className='relative py-4 md:py-5 bg-[var(--color-background)] text-[var(--color-content)] text-xl md:text-lg'>
		<div className='absolute bottom-full left-0 right-0 h-20 pointer-events-none bg-linear-to-t from-black/10 to-black/0' />
		<Container className='flex flex-col md:flex-row gap-2 md:items-center'>
			<Socials className='md:ml-auto' />
			<div className='flex-1 min-w-0 md:order-first'>
				<Moods />
			</div>
		</Container>
	</footer>
);
export default Footer;
