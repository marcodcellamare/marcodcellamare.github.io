import { Children, forwardRef, ReactNode } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import { useDevUtilities } from '@/contexts/dev-utilities';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ className, children }, ref) => {
		const spacing = useUIStore((state) => state.spacing);
		const { DevBreakpoints } = useDevUtilities();

		if (Children.count(children) === 0) return null;

		return (
			<div
				ref={ref}
				className={classNames([
					'container box-border mx-auto',
					spacing.container,
					className,
				])}>
				<DevBreakpoints />
				{children}
			</div>
		);
	}
);
export default Container;
