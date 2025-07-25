import classNames from 'classnames';

import '@/styles/components/elements/Pager.css';

interface PagerProps {
	isFirst: boolean;
	isLast: boolean;
}

const Pager = ({ isFirst, isLast }: PagerProps) => (
	<div
		className={classNames([
			'pager-line absolute left-10 w-[0.2rem]',
			{
				'top-0': !isFirst,
				'pager-first top-4/5': isFirst,
				'bottom-0': !isLast,
				'pager-last bottom-1/2': isLast,
			},
		])}
	/>
);
export default Pager;
