import { forwardRef, ReactNode } from 'react';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ className = '', children }, ref) => {
		const { spaceRef } = useSettings();

		return (
			<div
				ref={ref}
				className={classNames([
					'container mx-auto',
					spaceRef.current.container,
					className,
				])}>
				{children}
			</div>
		);
	}
);
export default Container;
