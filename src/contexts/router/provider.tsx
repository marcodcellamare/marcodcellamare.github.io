import { ReactNode, useEffect, useMemo } from 'react';
import { RouterContext } from './context';

import { useLocation, useNavigate } from 'react-router-dom';

import Config from '!config';

export const RouterProvider = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const pageId = useMemo<PageIdType>(
		() =>
			(Object.entries(Config.pages.list).find(
				([, value]) =>
					value === pathname ||
					value === `${Config.pages.hide}${pathname}`
			)?.[0] as PageIdType) ?? (Config.pages.default as PageIdType),
		[pathname]
	);

	// Redirect from trailing slash to no trailing slash

	useEffect(() => {
		if (pathname !== '/' && pathname.endsWith('/'))
			navigate(pathname.replace(/\/+$/, ''), { replace: true });
	}, [pathname, navigate]);

	return (
		<RouterContext.Provider
			value={{
				pageId,
			}}>
			{children}
		</RouterContext.Provider>
	);
};
