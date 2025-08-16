import { useRef } from 'react';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/contexts/parallax';
import { useSection } from '@/contexts/section';
import { random } from '@/utils/math';
import classNames from 'classnames';

import Picture from '@/app/misc/Picture';

interface ImageProps {
	src: string;
	className?: string;
}

const Image = ({ src, className }: ImageProps) => {
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

	return (
		<motion.div
			className={classNames(['template-gallery-image', className])}
			style={{ y }}>
			<Picture
				src={src}
				className='rounded-md'
			/>
		</motion.div>
	);
};
export default Image;
