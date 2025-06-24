import { Fragment, JSX, useRef } from 'react';
import { useParallax } from '!/contexts/parallax';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useSection } from '!/contexts/section';

import Timeline from './timeline';
import Default from './Default';

const Templates = () => {
	const { template } = useSection();
	const { getScrollConfig } = useParallax();

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
			content = <Default />;
			break;

		case 'timeline':
			content = <Timeline />;
			break;

		default:
			content = <Fragment />;
	}

	return (
		<motion.div
			ref={targetRef}
			style={{ y, scale, opacity, filter }}
			className='template-wrapper flex items-stretch w-full relative z-1'>
			{content}
		</motion.div>
	);
};
export default Templates;
