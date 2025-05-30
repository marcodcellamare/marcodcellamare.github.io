import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { RouterContext } from './context';

import { useLocation, useNavigate } from 'react-router-dom';

import Config from '!config';

export const RouterProvider = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [isNavOpened, setIsNavOpened] = useState(false);

	const pageId = useMemo<pageType>(
		() =>
			(Object.entries(Config.pages.list).find(
				([, value]) => value === pathname
			)?.[0] as pageType) ?? (Config.pages.default as pageType),
		[pathname]
	);

	const memoizedSetIsNavOpened = useCallback(setIsNavOpened, [
		setIsNavOpened,
	]);

	// Redirect from trailing slash to no trailing slash

	useEffect(() => {
		if (pathname !== '/' && pathname.endsWith('/'))
			navigate(pathname.replace(/\/+$/, ''), { replace: true });
	}, [pathname, navigate]);

	return (
		<RouterContext.Provider
			value={{
				pageId,
				isNavOpened,

				setIsNavOpened: memoizedSetIsNavOpened,
			}}>
			{children}
		</RouterContext.Provider>
	);
};
