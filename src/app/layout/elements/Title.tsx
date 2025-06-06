import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useParallax } from '!/contexts/parallax';
import { useRouter } from '!/contexts/router';
import { motion, useScroll, useTransform } from 'framer-motion';

import '!/styles/components/elements/Title.css';

interface TitleProps {
	sectionId: number;
	targetRef: RefObject<HTMLDivElement | null>;
}

const Title = ({ sectionId, targetRef }: TitleProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-15rem', '15rem']);
	const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
	const rotateX = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		['10deg', '1deg', '-1deg', '-10deg']
	);
	const opacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);
	const thickness = useTransform(
		scrollYProgress,
		[0, 0.2, 0.9],
		['0.4rem', '0.15rem', '0.01rem']
	);

	if (!i18n.exists(`sections.${sectionId}.title`, { ns: pageId }))
		return null;

	return (
		<div className='title absolute top-0 bottom-0 left-0 right-0 flex items-center perspective-normal'>
			<motion.div
				style={{
					y,
					scale,
					rotateX,
					opacity,
					['--title-thickness' as string]: thickness,
				}}
				className='h0 font-black uppercase -translate-x-[1%] text-transparent overflow-hidden origin-left'>
				{t(`sections.${sectionId}.title`)}
			</motion.div>
		</div>
	);
};
export default Title;
