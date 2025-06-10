import { useContext } from 'react';
import { RouterContext, RouterContextProps } from './context';

export const useRouter = (): RouterContextProps => {
	const context = useContext(RouterContext);

	if (!context) {
		throw new Error('useRouter must be used within a RouterProvider');
	}
	return context;
};
