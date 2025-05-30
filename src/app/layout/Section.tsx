import { ReactNode, useMemo } from 'react';
import { useParallax } from 'react-scroll-parallax';
import classNames from 'classnames';

import Container from './elements/Container';

import { ThemeType } from '!/types/layout';

interface SectionProps {
	sectionId: number;
	theme?: ThemeType;
	className?: string;
	children: ReactNode;
}

const Section = ({
	sectionId,
	theme = 'light-gray',
	className = '',
	children,
}: SectionProps) => {
	const { ref } = useParallax<HTMLDivElement>({ speed: -10 });

	return (
		<section
			data-theme={theme}
			className={classNames([
				'flex items-center min-h-full relative overflow-hidden bg-base-200 text-base-content',
				className,
			])}>
			<div
				ref={ref}
				className='h0 absolute left-0 right-0 flex items-center text-base-100 overflow-hidden'>
				Parallaxasdf lkasdjfsdfsdf
			</div>
			<Container>{children}</Container>
		</section>
	);
};

export default Section;
