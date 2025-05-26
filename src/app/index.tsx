import Footer from './layout/Footer';
import Header from './layout/Header';
import Meta from './layout/Meta';

import '!/styles/components/App.css';

const App = () => {
	return (
		<>
			<Meta />
			<div className='app min-w-xs select-none'>
				<Header />
				<main className='flex flex-col flex-grow border border-info'>
					<section className='bg-primary text-primary-content py-10'>
						<div className='container mx-auto border'>xxx</div>
					</section>
					<section className='bg-secondary text-secondary-content py-10'>
						xxxx
					</section>
					<section className='bg-accent text-accent-content py-10'>
						xxxx
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default App;
