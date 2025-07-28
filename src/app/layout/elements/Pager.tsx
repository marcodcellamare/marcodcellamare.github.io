import classNames from 'classnames';

import '@/styles/components/elements/Pager.css';

interface PagerProps {
	isFirst: boolean;
	isLast: boolean;
}

const Pager = ({ isFirst, isLast }: PagerProps) => (
	<div
		className={classNames([
			'pager absolute left-12 md:left-20 lg:left-30 xl:left-40 2xl:left-60 3xl:left-90 w-0.5',
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
