import Footer from './layout/Footer';
import Header from './layout/Header';
import Section from './layout/Section';
import Meta from './layout/Meta';

import '!/styles/components/App.css';

const App = () => {
	return (
		<>
			<Meta />
			<div className='app min-w-xs select-none flex flex-col'>
				<main className='flex flex-col flex-1 relative'>
					<div className='absolute top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-auto scrollbar'>
						<Section theme='secondary'>xxx</Section>
						<Section theme='base'>xxxx</Section>
						<Section theme='primary'>xxxx</Section>
						<Section theme='accent'>xxxx</Section>
					</div>
				</main>
				<Footer />
			</div>
			<Header />
		</>
	);
};
export default App;
