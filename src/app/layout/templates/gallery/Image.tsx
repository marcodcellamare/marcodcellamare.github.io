import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/contexts/parallax';
import { useSection } from '@/contexts/section';

import Picture from '@/app/misc/picture';
import { random } from '@/utils/math';
import { useRef } from 'react';

interface ImageProps {
	src: string;
}

const Image = ({ src }: ImageProps) => {
	const { sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	const randomY = useRef(Math.round(random({ min: 7, max: 15 }) * 10) / 10);
	const randomYRange = useRef(
		[`${randomY.current}rem`, `-${randomY.current}rem`].sort(
			() => Math.random() - 0.5
		)
	);
	const y = useTransform(scrollYProgress, [0, 1], randomYRange.current, {
		ease: easeInOut,
	});

	return (
		<motion.div style={{ y }}>
			<Picture
				src={src}
				className='rounded-md'
			/>
		</motion.div>
	);
};
export default Image;
