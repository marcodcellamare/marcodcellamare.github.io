import { useTranslation } from 'react-i18next';
import { useParallax } from '@/contexts/parallax';
import { useUIStore } from '@/stores/useUIStore';
import { useSection } from '@/contexts/section';
import useBreakpoints from '@/hooks/useBreakpoints';
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
	const { currentBreakpoint } = useBreakpoints();

	const y = useTransform(scrollYProgress, [0, 1], ['-20rem', '20rem']);
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.1, 0.6, 1],
		[0, 1, 1, 0]
	);
	const zIndex = useTransform(scrollYProgress, [0.4, 0.5], [3, 0]);
	const borderThickness = useTransform(
		scrollYProgress,
		[0, 0.4, 0.7, 1],
		['0.4rem', '0.1rem', '0.1rem', '0.01rem'],
		{
			ease: easeOut,
		}
	);

	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.1, 0.4, 0.5, 1],
		['1rem', '0rem', '0rem', '0.15rem', '1rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	const maxLength = t(`sections.${sectionId}.title`)
		.split(/[\s\-–—/_]+/)
		.reduce(
			(longest, word) => (word.length > longest.length ? word : longest),
			''
		).length;

	if (
		!i18n.exists(`sections.${sectionId}.title`, { ns: pageId }) ||
		currentBreakpoint === 'xs'
	)
		return null;

	return (
		<motion.div
			className='title absolute top-0 bottom-0 left-0 right-0 pointer-events-none'
			style={{ zIndex }}>
			<div className='sticky top-0 left-0 right-0 h-(--main-h)'>
				<motion.div
					className='absolute top-1/2 left-0 lg:left-1/2 -translate-y-1/2 lg:-translate-x-1/2 contain-layout'
					style={{
						y,
						opacity,
						filter,
						['--border-thickness' as string]: borderThickness,
						['--char-count' as string]: maxLength,
					}}>
					<h4
						className={classNames([
							'relative block font-black uppercase',
							'text-transparent',
							'-rotate-90 lg:-rotate-3 lg:-skew-x-3 origin-top lg:origin-center',
							{
								extra: isFirst,
							},
						])}>
						<div
							className={classNames([
								'absolute top-0 lg:top-1/2 left-1/2 -translate-x-1/2 lg:-translate-y-1/2 min-w-fit max-w-[100dvh] lg:max-w-full',
								spacing.absEdgePadding,
							])}>
							{t(`sections.${sectionId}.title`)}
						</div>
					</h4>
				</motion.div>
			</div>
		</motion.div>
	);
};
export default Title;
