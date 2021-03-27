import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { Home, About } from './components/pages';
import './App.scss';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<article>
					<Switch>
						<Route path='/about'>
							<About />
						</Route>
						<Route path='/'>
							<Home />
						</Route>
					</Switch>
				</article>
			</BrowserRouter>
			<Footer />
		</div>
	);
}

export default App;
