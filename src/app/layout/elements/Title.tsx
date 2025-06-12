import { useTranslation } from 'react-i18next';
import { useParallax } from '!/contexts/parallax';
import { useRouter } from '!/contexts/router';
import { useSection } from '!/contexts/section';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';

import '!/styles/components/elements/Title.css';
import classNames from 'classnames';

const Title = () => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, targetRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-15rem', '15rem']);
	const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
	const zIndex = useTransform(scrollYProgress, [0.15, 1], [1, -1]);
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
		<div className='title absolute top-0 bottom-0 left-0 right-0 flex overflow-hidden items-center pointer-events-none'>
			<motion.div
				style={{
					y,
					opacity,
					zIndex,
					['--title-thickness' as string]: thickness,
				}}
				className={classNames([
					'h0 font-black uppercase -translate-x-[1%] text-transparent origin-bottom-left',
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
