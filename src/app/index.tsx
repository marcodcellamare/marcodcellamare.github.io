import Meta from './layout/Meta';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

import '!/styles/components/App.css';

const App = () => {
	return (
		<>
			<Meta />
			<div className='app min-w-xs select-none flex flex-col'>
				<Main />
				<Footer />
			</div>
			<Header />
		</>
	);
};
export default App;
