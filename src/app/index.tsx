import Meta from './layout/Meta';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Router from './misc/Router';
import Loader from './misc/Loader';
import Cursor from './misc/Cursor';

import '!/styles/components/App.css';

const App = () => {
	return (
		<>
			<Meta />
			<div className='app min-w-xs select-none flex flex-col'>
				<Router />
				<Footer />
			</div>
			<Loader />
			<Header />
			<Cursor />
		</>
	);
};
export default App;
