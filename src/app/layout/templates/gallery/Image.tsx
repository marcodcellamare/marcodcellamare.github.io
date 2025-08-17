import { useMemo, useRef } from 'react';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/contexts/parallax';
import { random } from '@/utils/math';
import classNames from 'classnames';

import Picture from '@/app/misc/Picture';
import { useSection } from '@/contexts/section';

interface ImageProps {
	src: string;
	className?: string;
}

const Image = ({ src, className }: ImageProps) => {
	const { sectionFullRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionFullRef));

	const isMoving = useMemo(() => Math.random() < 0.5, []);
	const randomY = useRef(
		Math.round(random({ min: 0, max: isMoving ? 50 : 5 }) * 10) / 10
	);
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		[`0rem`, `-${randomY.current}rem`],
		{
			ease: easeInOut,
		}
	);

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
