import { Fragment, JSX, useRef } from 'react';
import { useParallax } from '!/contexts/parallax';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useSection } from '!/contexts/section';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Container from '!/app/layout/elements/Container';
import Default from './Default';
import Carousel from './carousel';

const Templates = () => {
	const { template } = useSection();
	const { getScrollConfig } = useParallax();
	const { spaceRef } = useSettings();

	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	let content: JSX.Element;

	const y = useTransform(scrollYProgress, [0, 1], ['-5rem', '5rem']);
	const scale = useTransform(scrollYProgress, [0.9, 1], [1, 0.98], {
		ease: easeInOut,
	});
	const opacity = useTransform(
		scrollYProgress,
		[0.1, 0.2, 0.9, 1],
		[0, 1, 1, 0]
	);
	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.4, 0.8, 1],
		['1.6rem', '0rem', '0rem', '1rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	switch (template) {
		case 'default':
			content = (
				<Container
					className={classNames([
						'flex flex-col justify-center lg:flex-row lg:justify-normal lg:items-center relative',
						spaceRef.current.content,
						spaceRef.current.section,
					])}>
					<Default className='flex-1' />
				</Container>
			);
			break;

		case 'carousel':
			content = <Carousel template={<Default />} />;
			break;

		default:
			content = <Fragment />;
	}

	return (
		<motion.div
			ref={targetRef}
			style={{ y, scale, opacity, filter }}
			className='template-wrapper flex items-center w-full relative z-1'>
			{content}
		</motion.div>
	);
};
export default Templates;
