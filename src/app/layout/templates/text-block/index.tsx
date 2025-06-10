import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { easeInOut, motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';
import { useSection } from '!/contexts/section';
import classNames from 'classnames';

import Heading from './Heading';
import Content from './Content';

interface ContentProps {
	className?: string;
}

const TextBlock = ({ className = '' }: ContentProps) => {
	const { pageId } = useRouter();
	const { i18n } = useTranslation(pageId);
	const { sectionId } = useSection();

	const targetRef = useRef<HTMLDivElement>(null);

	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-5rem', '5rem']);
	const scale = useTransform(
		scrollYProgress,
		[0, 0.2, 0.9, 1],
		[0.9, 1, 1, 0.98],
		{
			ease: easeInOut,
		}
	);
	const opacity = useTransform(
		scrollYProgress,
		[0.1, 0.2, 0.9, 1],
		[0, 1, 1, 0]
	);

	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.4, 0.9, 1],
		['1.5rem', '0rem', '0rem', '0.2rem'],
		{
			ease: easeInOut,
		}
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	const contentExists = i18n.exists(`sections.${sectionId}.content`, {
		ns: pageId,
	});

	return (
		<motion.div
			ref={targetRef}
			style={{ y, scale, opacity, filter }}
			className={classNames(['text-block origin-left', className])}>
			<Heading
				sectionId={sectionId}
				className={classNames({
					'mb-6 lg:mb-10': contentExists,
				})}
			/>
			<Content
				sectionId={sectionId}
				className=''
			/>
		</motion.div>
	);
};
export default TextBlock;
