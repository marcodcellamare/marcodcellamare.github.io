import { createElement } from 'react';
import HTMLParser from 'html-react-parser';
import DOMPurify from 'dompurify';

const Content = ({
	id,
	title,
	subtitle,
	text,
	className,
}: {
	id: number;
	title?: string;
	subtitle?: string;
	text?: string;
	className?: string;
}) => {
	return (
		<div className={`section-content ${className}`.trim()}>
			<Text
				as={id === 0 ? 'h1' : 'h2'}
				className={`display-2 fw-bold ${
					subtitle || text ? 'mt-0 mb-5' : 'my-0'
				}`}>
				{title}
			</Text>
			<Text className={`lead ${text ? 'mt-0 mb-5' : 'my-0'}`}>
				{subtitle}
			</Text>
			<Text className='my-0'>{text}</Text>
		</div>
	);
};
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

	return children
		? createElement(
				as,
				{ className },
				HTMLParser(
					DOMPurify.sanitize(children, {
						USE_PROFILES: {
							html: true,
						},
					})
				)
		  )
		: null;
};
export default Content;
