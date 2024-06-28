import { createElement } from 'react';
import HTMLParser from 'html-react-parser';
import DOMPurify from 'dompurify';

const Text = ({
	as = 'p',
	className,
	children,
}: {
	as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	className?: string;
	children?: string;
}) => {
	// Create a new HTML element with a custom tag
	// and with HTML sanitize function

	if (!children) return null;

	return createElement(
		as,
		{ className },
		HTMLParser(
			DOMPurify.sanitize(children, {
				USE_PROFILES: {
					html: true,
				},
			})
		)
	);
};
export default Text;
