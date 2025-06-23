import { useTranslation } from 'react-i18next';
import { useParallax } from '!/contexts/parallax';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';
import classNames from 'classnames';

import '!/styles/components/elements/Title.css';

const Title = () => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-15rem', '15rem']);
	const opacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);
	const zIndex = useTransform(scrollYProgress, [0.3, 0.35], [5, 0]);
	const patternThickness = useTransform(
		scrollYProgress,
		[0, 0.3, 0.5, 1],
		['0.7rem', '0.4rem', '0.15rem', '0.01rem'],
		{
			ease: easeOut,
		}
	);

	if (!i18n.exists(`sections.${sectionId}.title`, { ns: pageId }))
		return null;

	return (
		<div className='title absolute top-0 bottom-0 left-0 right-0 flex overflow-hidden items-center pointer-events-none'>
			<motion.div
				style={{
					y,
					opacity,
					zIndex,
					['--pattern-thickness' as string]: patternThickness,
				}}
				className={classNames([
					'h0 font-black uppercase -translate-x-[2%] text-transparent origin-bottom-left',
					{
						extra: sectionId === 0,
					},
				])}>
				{t(`sections.${sectionId}.title`)}
			</motion.div>
		</div>
	);
};
export default Title;
