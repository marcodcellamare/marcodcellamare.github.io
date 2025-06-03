import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useParallax } from '!/contexts/parallax';
import { useRouter } from '!/contexts/router';
import { motion, useScroll, useTransform } from 'framer-motion';

import '!/styles/components/elements/Pattern.css';

interface PatternProps {
	sectionId: number;
	targetRef: RefObject<HTMLDivElement | null>;
}

const H0 = ({ sectionId, targetRef }: PatternProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-15rem', '15rem']);
	const rotateX = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		['10deg', '1deg', '-1deg', '-10deg']
	);
	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.4, 0.5, 0.6, 1],
		[15, 5, 0, 5, 15]
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value}px)`);

	if (!i18n.exists(`${pageId}:sections.${sectionId}.heading.h0`)) return null;

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 flex items-center perspective-normal'>
			<motion.div
				style={{ y, rotateX, filter }}
				className='h0 -translate-x-[2%] text-base-100 overflow-hidden'>
				{t(`sections.${sectionId}.heading.h0`)}
			</motion.div>
		</div>
	);
};
export default H0;
