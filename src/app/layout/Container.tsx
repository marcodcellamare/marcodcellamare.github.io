import { ReactNode } from 'react';

import classNames from 'classnames';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = ({ className = '', children }: ContainerProps) => (
	<div
		className={classNames([
			'container mx-auto px-5 md:px-10 py-5 border',
			className,
		])}>
		{children}
	</div>
);

export default Container;
