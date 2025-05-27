import Section from './Section';

const Main = () => (
	<main className='flex flex-col flex-1 relative'>
		<div className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto scrollbar'>
			<Section theme='base'>xxxx</Section>
			<Section theme='primary'>xxxx</Section>
			<Section theme='accent'>xxxx</Section>
			<Section theme='secondary'>xxx</Section>
		</div>
	</main>
);
export default Main;
