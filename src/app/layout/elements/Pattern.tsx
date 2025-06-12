import { useSection } from '!/contexts/section';
import { useParallax } from '!/contexts/parallax';
import { motion, useScroll, useTransform } from 'framer-motion';

import '!/styles/components/elements/Pattern.css';

const Pattern = () => {
	const { targetRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const height = useTransform(scrollYProgress, [0.5, 1], ['0%', '50%']);

	return (
		<motion.div
			style={{ height }}
			className='pattern absolute bottom-0 left-0 right-0 flex flex-col pointer-events-none'>
			{new Array(5).fill(false).map((_, k) => (
				<div
					key={k}
					className='flex-1'
				/>
			))}
		</motion.div>
	);
};
export default Pattern;
