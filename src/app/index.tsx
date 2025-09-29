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
					'app flex 7xl:justify-center 4xl:p-10 5xl:p-20 6xl:p-30 7xl:p-60 select-none',
					'transition-[background-color] duration-500 ease-in-out',
					!isNavOpened
						? 'bg-(--color-theme-background-contrast)'
						: 'bg-(--color-theme-background)',
				])}>
				<div
					className={classNames([
						'app-wrapper flex flex-1 h-full overflow-hidden relative',
						'max-w-(--breakpoint-7xl)',
						'4xl:shadow-2xl 4xl:shadow-black/15',
						'border-5 border-(--color-theme-background) border-l-0',
					])}>
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
