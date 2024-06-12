import { useEffect, cloneElement, useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';

function Location(props) {
	let location = useLocation();
	const [value, setValue] = useState({ location: {} });
	const children = cloneElement(props.children, { location: value });

	useEffect(() => {
		location.page = location.pathname.substring(1).replaceAll('/', '-');

		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname,
			title: location.page
		});
		setValue({ ...location });
	}, [location]);

	return children;
}
export default Location;