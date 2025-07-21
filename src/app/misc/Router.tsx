import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '@/app/layout/Main';

import config from '@config';

import { PageIdType } from '@/types/config.const';

const Router = () => (
	<Routes>
		{(Object.keys(config.pages.list) as PageIdType[]).map((pageId) => (
			<Route
				key={pageId}
				path={config.pages.list[pageId].slice(
					config.pages.list[pageId].startsWith(config.pages.hide)
						? 1
						: 0
				)}
				index={pageId === config.pages.default}
				element={<Main />}
			/>
		))}
		<Route
			path='*'
			element={
				<Navigate
					to={config.pages.list[config.pages.default]}
					replace
				/>
			}
		/>
	</Routes>
);
export default Router;
