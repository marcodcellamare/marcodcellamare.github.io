import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

import Container from './Container';

import '@/styles/components/elements/Pager.css';

interface PagerProps {
	isFirst: boolean;
	isLast: boolean;
}

const Pager = ({ isFirst, isLast }: PagerProps) => {
	const { spaceRef } = useSettings();

	return (
		<Container
			className={classNames([
				'pager absolute left-0 right-0 flex pointer-events-none',
				spaceRef.current.content,
				{
					'top-0': !isFirst,
					'pager-first top-4/5': isFirst,
					'bottom-0': !isLast,
					'pager-last bottom-1/2': isLast,
				},
			])}>
			<div className='pager-line relative left-10 w-[0.2rem]' />
		</Container>
	);
};
export default Pager;
