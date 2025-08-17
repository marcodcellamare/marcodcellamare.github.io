import classNames from 'classnames';

import '@/styles/components/elements/Pager.css';

interface PagerProps {
	isFirst: boolean;
}

const Pager = ({ isFirst }: PagerProps) => (
	<div
		className={classNames([
			'pager absolute bottom-0 left-12 md:left-20 lg:left-30 xl:left-40 2xl:left-60 3xl:left-90 w-0.5 pointer-events-none contain-layout',
			{
				'top-0': !isFirst,
				'pager-first top-4/5': isFirst,
			},
		])}
	/>
);
export default Pager;
