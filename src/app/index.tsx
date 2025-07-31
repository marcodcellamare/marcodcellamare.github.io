import { useEffect, useState } from 'react';

import Meta from './layout/Meta';
import Fonts from './layout/Fonts';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Drawer from './layout/Drawer';
import Router from './misc/Router';
import Cursor from './misc/Cursor';

import '@/styles/components/App.css';

const App = () => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setIsReady(true);
	}, []);

	if (!isReady) return null;

	return (
		<>
			<Meta />
			<Fonts />
			<div className='app flex 3xl:justify-center 3xl:items-center bg-(--color-palette-gray) 3xl:p-10 4xl:p-20 6xl:p-30 select-none'>
				<div className='flex flex-1 h-full min-w-xs max-w-(--breakpoint-3xl) 3xl:max-h-(--breakpoint-xl) 3xl:border-[calc(var(--spacing)*2)] 3xl:border-white 3xl:shadow-2xl overflow-hidden relative'>
					<Router />
					<Footer />
					<Header />
					<Drawer />
					<Cursor />
				</div>
			</div>
		</>
	);
};
export default App;
