import { useSection } from '!/contexts/section';
import classNames from 'classnames';

import Container from './Container';

import '!/styles/components/elements/Pager.css';

const Pager = () => {
	const { sectionId } = useSection();

	return (
		<Container
			className={classNames([
				'pager absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
				sectionId > 0 ? 'top-0' : 'top-4/5',
				`pager-${sectionId}`,
			])}>
			<div className='pager-line absolute top-0 bottom-0 left-1/8 w-[0.2rem]' />
		</Container>
	);
};
export default Pager;
