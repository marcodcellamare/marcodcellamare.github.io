import { useMemo, useRef } from 'react';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/contexts/parallax';
import { random } from '@/utils/math';
import classNames from 'classnames';

import Picture from '@/app/misc/Picture';

interface ImageProps {
	src: string;
	className?: string;
}

const Image = ({ src, className }: ImageProps) => {
	const divRef = useRef(null);
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(divRef));

	const isMoving = useMemo(() => Math.random() < 0.5, []);
	const randomY = useRef(
		Math.round(random({ min: 0, max: isMoving ? 15 : 3 }) * 10) / 10
	);
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		[`0rem`, `-${randomY.current}rem`],
		{
			ease: easeInOut,
		}
	);
	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.4, 0.6, 1],
		['5rem', '0rem', '0rem', '5rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.4, 0.7, 0.8, 1],
		[0.25, 1, 1, 0.25, 0],
		{
			ease: easeInOut,
		}
	);

	return (
		<motion.div
			ref={divRef}
			className={classNames(['template-gallery-image', className])}
			style={{ opacity, y, filter }}>
			<Picture
				src={src}
				className='rounded-md'
			/>
		</motion.div>
	);
};
export default Image;
