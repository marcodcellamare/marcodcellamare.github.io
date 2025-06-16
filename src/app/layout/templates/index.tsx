import { Fragment, JSX, useRef } from 'react';
import { useParallax } from '!/contexts/parallax';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useSection } from '!/contexts/section';

import Timeline from './timeline';
import Default from './default';

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
	const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.3, 0.9, 1],
		['1.6rem', '0rem', '0rem', '1rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	switch (template) {
		case 'default:full':
		case 'default:left':
		case 'default:right':
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
			className='wrapper w-full'>
			{content}
		</motion.div>
	);
};
export default Templates;
