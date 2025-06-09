import Moods from './moods';
import Container from './elements/Container';

const Footer = () => (
	<footer className='py-4 md:py-5 bg-[var(--color-background)] text-[var(--color-content)]'>
		<Container className='flex flex-col md:flex-row gap-0.5 md:gap-1'>
			<Moods className='mr-auto' />
			<div className='md:ml-auto'>xxx</div>
		</Container>
	</footer>
);
export default Footer;
