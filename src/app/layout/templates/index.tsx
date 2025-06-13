import { Fragment, JSX, useRef } from 'react';
import { useSection } from '!/contexts/section';

import Container from '../elements/Container';
import Timeline from './timeline';
import Content from './content';
import { useParallax } from '!/contexts/parallax';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';

const Templates = () => {
	const { template } = useSection();
	const { getScrollConfig } = useParallax();

	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	let content: JSX.Element;

	const y = useTransform(scrollYProgress, [0, 1], ['-5rem', '5rem']);
	const scale = useTransform(
		scrollYProgress,
		[0, 0.6, 0.9, 1],
		[0.95, 1, 1, 0.98],
		{
			ease: easeInOut,
		}
	);
	const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.4, 0.9, 1],
		['1.6rem', '0rem', '0rem', '1rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	switch (template) {
		case 'text:full':
		case 'text:left':
		case 'text:right':
			content = <Content />;
			break;

		case 'timeline':
			content = <Timeline />;
			break;

		default:
			content = <Fragment />;
	}

	return (
		<Container className='relative my-30 border'>
			<motion.div
				ref={targetRef}
				style={{ y, scale, opacity, filter }}
				className='flex flex-col gap-10 lg:gap-15 md:flex-row origin-bottom-left'>
				{content}
			</motion.div>
		</Container>
	);
};
export default Templates;
