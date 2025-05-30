import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '!/app/layout/Main';

import Config from '!config';

const Router = () => (
	<Routes>
		<Route element={<Main />}>
			{(
				Object.keys(Config.pages.list) as Array<
					keyof typeof Config.pages.list
				>
			).map((pageId) => (
				<Route
					key={pageId}
					path={Config.pages.list[pageId].slice(
						Config.pages.list[pageId].startsWith(Config.pages.hide)
							? 1
							: 0
					)}
					index={pageId === Config.pages.default}
				/>
			))}
		</Route>
		<Route
			path='*'
			element={
				<Navigate
					to={
						Config.pages.list[
							Config.pages
								.default as keyof typeof Config.pages.list
						]
					}
					replace
				/>
			}
		/>
	</Routes>
);
export default Router;
