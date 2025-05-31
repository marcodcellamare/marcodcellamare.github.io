import { ReactNode } from 'react';

import classNames from 'classnames';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = ({ className = '', children }: ContainerProps) => (
	<div
		className={classNames([
			'container mx-auto px-5 md:px-10 relative',
			className,
		])}>
		{children}
	</div>
);

export default Container;
