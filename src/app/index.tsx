import { useUIStore } from '@/stores/useUIStore';

import Meta from './layout/Meta';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Router from './misc/Router';
import Cursor from './misc/Cursor';

import '@/styles/components/App.css';
import { useEffect, useState } from 'react';

const App = () => {
	const pageTheme = useUIStore((state) => state.pageTheme);

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setIsReady(true);
	}, []);

	if (!isReady) return null;

	return (
		<div className='app flex 3xl:justify-center 3xl:items-center bg-(--color-palette-gray) 3xl:p-10 4xl:p-20 6xl:p-30 select-none'>
			<div className='flex flex-1 h-full min-w-xs max-w-(--breakpoint-3xl) 3xl:max-h-(--breakpoint-xl) 3xl:border-10 3xl:border-white 3xl:shadow-2xl overflow-hidden relative'>
				<Meta />
				<div
					data-theme={pageTheme}
					className='flex flex-1 relative'>
					<Router />
				</div>
				<Footer />
				<Header />
				<Cursor />
			</div>
		</div>
	);
};
export default App;
