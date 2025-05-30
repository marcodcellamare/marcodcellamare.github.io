import Meta from './layout/Meta';
import Header from './layout/Header';
import Footer from './layout/Footer';

import '!/styles/components/App.css';
import Router from './misc/Router';

const App = () => {
	return (
		<>
			<Meta />
			<div className='app min-w-xs select-none flex flex-col'>
				<Router />
				<Footer />
			</div>
			<Header />
		</>
	);
};
export default App;
