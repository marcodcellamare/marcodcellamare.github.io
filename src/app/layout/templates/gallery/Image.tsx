import { useRef } from 'react';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/contexts/parallax';
import { useSection } from '@/contexts/section';
import { random } from '@/utils/math';

import Picture from '@/app/misc/picture';

interface ImageProps {
	src: string;
}

const Image = ({ src }: ImageProps) => {
	const { sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	const randomY = useRef(Math.round(random({ min: 5, max: 10 }) * 10) / 10);
	const randomYRange = useRef(
		[`${randomY.current}rem`, `-${randomY.current}rem`].sort(
			() => Math.random() - 0.5
		)
	);
	const y = useTransform(scrollYProgress, [0, 1], randomYRange.current, {
		ease: easeInOut,
	});
	const randomX = useRef(Math.round(random({ min: -1, max: 1 }) * 10) / 10);

	return (
		<motion.div style={{ y, x: `${randomX.current}rem` }}>
			<Picture
				src={src}
				className='rounded-md'
			/>
		</motion.div>
	);
};
export default Image;
