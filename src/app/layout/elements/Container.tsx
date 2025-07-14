import { forwardRef, ReactNode } from 'react';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';
import { useDevUtilities } from '!/contexts/dev-utilities';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
	({ className = '', children }, ref) => {
		const { DevBreakpoints } = useDevUtilities();
		const { spaceRef } = useSettings();

		return (
			<div
				ref={ref}
				className={classNames([
					'container box-border mx-auto',
					spaceRef.current.container,
					className,
				])}>
				<DevBreakpoints />
				{children}
			</div>
		);
	}
);
export default Container;
