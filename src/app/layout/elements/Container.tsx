import { forwardRef, ReactNode } from 'react';

import classNames from 'classnames';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ className = '', children }, ref) => (
		<div
			ref={ref}
			className={classNames([
				'container mx-auto px-5 md:px-10 relative',
				className,
			])}>
			{children}
		</div>
	)
);
export default Container;
