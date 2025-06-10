import { Fragment, JSX } from 'react';
import { useSection } from '!/contexts/section';

import Container from '../elements/Container';
import Timeline from './timeline';

import Content from './content';

const Templates = () => {
	const { template } = useSection();

	let content: JSX.Element;

	switch (template) {
		case 'text:full':
		case 'text:left':
		case 'text:right':
			content = <Content />;
			break;

		case 'timeline':
			content = <Timeline />;
			break;

		default:
			content = <Fragment />;
	}

	return (
		<Container className='relative flex flex-col gap-10 lg:gap-15 md:flex-row py-20'>
			{content}
		</Container>
	);
};
export default Templates;
