import { useTranslation } from 'react-i18next';
import { useParallax } from '@/contexts/parallax';
import { useUIStore } from '@/stores/useUIStore';
import { useSection } from '@/contexts/section';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';
import classNames from 'classnames';

import '@/styles/components/elements/Title.css';

interface TitleProps {
	isFirst?: boolean;
}

const Title = ({ isFirst }: TitleProps) => {
	const pageId = useUIStore((state) => state.pageId);
	const spacing = useUIStore((state) => state.spacing);
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-20rem', '20rem']);
	const opacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);
	const zIndex = useTransform(scrollYProgress, [0.3, 0.35], [5, 0]);
	const patternThickness = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		['0.3rem', '0.05rem', '0.01rem'],
		{
			ease: easeOut,
		}
	);

	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.1],
		['1rem', '0rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	const maxLength = t(`sections.${sectionId}.title`)
		.split(/\s+/)
		.reduce(
			(longest, word) => (word.length > longest.length ? word : longest),
			''
		).length;

	if (!i18n.exists(`sections.${sectionId}.title`, { ns: pageId }))
		return null;

	return (
		<motion.div
			className='title absolute top-1/2 left-0 lg:left-1/2 -translate-y-1/2 lg:-translate-x-1/2'
			style={{
				y,
				opacity,
				filter,
				zIndex,
				['--pattern-thickness' as string]: patternThickness,
				['--char-count' as string]: maxLength,
			}}>
			<h4
				className={classNames([
					'relative block font-black uppercase',
					'text-(--color-theme-background-contrast)/10',
					'-rotate-90 lg:-rotate-3 lg:-skew-x-3 origin-top lg:origin-center',
					{
						extra: isFirst,
					},
				])}>
				<div
					className={classNames([
						'absolute top-0 lg:top-1/2 left-1/2 -translate-x-1/2 lg:-translate-y-1/2 min-w-fit max-w-(--main-vh) lg:max-w-(--main-vw) drop-shadow-md drop-shadow-black/10',
						spacing.absEdgePadding,
					])}>
					{t(`sections.${sectionId}.title`)}
				</div>
			</h4>
		</motion.div>
	);
};
export default Title;
