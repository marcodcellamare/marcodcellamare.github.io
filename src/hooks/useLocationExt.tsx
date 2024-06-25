import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

interface UseLocation {
	hash: string;
	key: string;
	pathname: string;
	search: string;
	state?: string;
	page?: string;
}
const useLocationExt = () => {
	let location: UseLocation = useLocation();
	const [value, setValue] = useState<UseLocation>();

	useEffect(() => {
		// Generate a page (id) out of the pathname

		location.page = location.pathname
			? location.pathname.substring(1).replace(/\//g, '-')
			: '';

		// If page is empty, use "home"

		if (!location.page) location.page = 'home';

		// Send to Google Analytics

		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname,
			title: location.page,
		});

		// Set the location state

		setValue({ ...location });
	}, [location]);

	return value;
};
export default useLocationExt;
