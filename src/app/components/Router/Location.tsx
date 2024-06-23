import { useEffect, cloneElement, useState } from 'react';
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
const Location = ({
	children,
}: {
	children: React.ReactElement | React.ReactElement[];
}) => {
	let location: UseLocation = useLocation();
	const [value, setValue] = useState<UseLocation>();

	// Pass the location object to the children

	if (!Array.isArray(children)) children = [children];

	children.forEach((child, k) => {
		children[k] = cloneElement(child, { location: value });
	});

	useEffect(() => {
		// Generate a page (id) out of the pathname

		location.page = location.pathname
			? location.pathname.substring(1).replace(/\//g, '-')
			: '';

		// If page is empty, use /

		if (!location.page) location.page = '/';

		// Send to Google Analytics

		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname,
			title: location.page,
		});

		// Set the location state

		setValue({ ...location });
	}, [location]);

	return children;
};
export default Location;
