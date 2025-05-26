import { ReactNode, useMemo } from 'react';
import Container from './Container';

import classNames from 'classnames';

interface SectionProps {
	theme?: 'primary' | 'secondary' | 'accent' | 'base';
	className?: string;
	children: ReactNode;
}

const Section = ({
	theme = 'base',
	className = '',
	children,
}: SectionProps) => {
	const themeClassName = useMemo(() => {
		switch (theme) {
			case 'primary':
				return 'bg-primary text-primary-content';

			case 'secondary':
				return 'bg-secondary text-secondary-content';

			case 'accent':
				return 'bg-accent text-accent-content';

			case 'base':
				return 'bg-base-100 text-base-content';
		}
	}, [theme]);

	return (
		<section
			className={classNames([
				'flex items-center min-h-full relative',
				themeClassName,
				className,
			])}>
			<Container>{children}</Container>
		</section>
	);
};

export default Section;
