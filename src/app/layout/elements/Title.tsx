import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useParallax } from '!/contexts/parallax';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';

import '!/styles/components/elements/Title.css';

interface TitleProps {
	targetRef: RefObject<HTMLDivElement | null>;
}

const Title = ({ targetRef }: TitleProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-15rem', '15rem']);
	const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
	const thickness = useTransform(
		scrollYProgress,
		[0, 0.8],
		['0.5rem', '0.01rem'],
		{
			ease: easeOut,
		}
	);

	if (!i18n.exists(`sections.${sectionId}.title`, { ns: pageId }))
		return null;

	return (
		<div className='title absolute top-0 bottom-0 left-0 right-0 flex overflow-hidden items-center'>
			<motion.div
				style={{
					y,
					opacity,
					['--title-thickness' as string]: thickness,
				}}
				className='h0 font-black uppercase -translate-x-[1%] text-transparent origin-bottom-left'>
				{t(`sections.${sectionId}.title`)}
			</motion.div>
		</div>
	);
};
export default Title;
