import { motion, useScroll, useTransform } from 'framer-motion';
import { useSection } from '!/contexts/section';
import { useParallax } from '!/contexts/parallax';

const Timeline = () => {
	const { sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	// Total width you want to scroll (e.g., 2000px)
	const translateX = useTransform(scrollYProgress, [0.5, 1], ['0%', '-100%']);

	/*
	.timeline-section {
  position: relative;
  height: 300vh; /* Make it 3x viewport height to simulate scrolling * /
  overflow: hidden;
}

.timeline-track {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
}
*/

	return (
		<motion.div
			className='flex flex-row ----justify-start sticky top-0 border-4 border-red-500'
			style={{ translateX }}>
			{new Array(4).fill(false).map((_, k) => (
				<div
					key={k}
					className='----min-w-[10vw] border'>
					{k}
				</div>
			))}
		</motion.div>
	);
};

export default Timeline;
