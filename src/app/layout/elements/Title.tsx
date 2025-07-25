import { useTranslation } from 'react-i18next';
import { useParallax } from '@/contexts/parallax';
import { useRouter } from '@/contexts/router';
import { useSection } from '@/contexts/section';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';
import classNames from 'classnames';

import '@/styles/components/elements/Title.css';

interface TitleProps {
	isFirst?: boolean;
}

const Title = ({ isFirst }: TitleProps) => {
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
		[0, 0.5, 1],
		['0.5rem', '0.07rem', '0.01rem'],
		{
			ease: easeOut,
		}
	);

	if (!i18n.exists(`sections.${sectionId}.title`, { ns: pageId }))
		return null;

	return (
		<motion.div
			className='title absolute top-1/2 -left-3 lg:left-5 3xl:left-20 -translate-y-1/2'
			style={{
				y,
				opacity,
				zIndex,
				['--pattern-thickness' as string]: patternThickness,
			}}>
			<h4
				className={classNames([
					'relative h0 font-black uppercase text-transparent origin-left',
					{
						extra: isFirst,
					},
				])}>
				{t(`sections.${sectionId}.title`)}
			</h4>
		</motion.div>
	);
};
export default Title;
