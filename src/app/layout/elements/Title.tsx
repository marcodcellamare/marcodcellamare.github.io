import { useTranslation } from 'react-i18next';
import { useParallax } from '@/contexts/parallax';
import { useRouter } from '@/contexts/router';
import { useSettings } from '@/contexts/settings';
import { useSection } from '@/contexts/section';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';
import classNames from 'classnames';

import Container from './Container';

import '@/styles/components/elements/Title.css';

const Title = () => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { spaceRef } = useSettings();
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
		<Container
			className={classNames([
				'absolute bottom-1/2 left-0 right-0 pointer-events-none',
				spaceRef.current.container,
			])}>
			<motion.div
				className='title'
				style={{
					y,
					opacity,
					zIndex,
					['--pattern-thickness' as string]: patternThickness,
				}}>
				<h4 className='relative h0 font-black uppercase text-transparent origin-left'>
					{t(`sections.${sectionId}.title`)}
				</h4>
			</motion.div>
		</Container>
	);
};
export default Title;
