import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import Meta from './layout/Meta';
import Fonts from './layout/Fonts';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Drawer from './layout/Drawer';
import Router from './misc/Router';
import Cursor from './misc/Cursor';

import '@/styles/components/App.css';

const App = () => {
	const pageTheme = useUIStore((state) => state.pageTheme);
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setIsReady(true);
	}, []);

	if (!isReady) return null;

	return (
		<>
			<Meta />
			<Fonts />
			<div
				data-theme={pageTheme}
				className={classNames([
					'app flex 4xl:justify-center 4xl:items-center 4xl:p-10 5xl:p-20 6xl:p-30 select-none',
					'transition-[background-color] duration-500 ease-in-out',
					!isNavOpened
						? 'bg-(--color-theme-background-contrast)'
						: 'bg-(--color-theme-background)',
				])}>
				<div className='flex flex-1 h-full min-w-xs max-w-(--breakpoint-4xl) 4xl:max-h-(--breakpoint-xl) 4xl:shadow-2xl 4xl:shadow-black/15 overflow-hidden relative'>
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
