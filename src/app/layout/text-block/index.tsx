import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';
import classNames from 'classnames';

import Heading from './Heading';
import Content from './Content';

interface ContentProps {
	sectionId: number;
	className?: string;
}

const TextBlock = ({ sectionId, className = '' }: ContentProps) => {
	const { pageId } = useRouter();
	const { i18n } = useTranslation(pageId);

	const targetRef = useRef<HTMLDivElement>(null);

	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-5rem', '5rem']);
	const scale = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		[0.9, 1, 1, 0.9]
	);
	const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

	const blurAmount = useTransform(
		scrollYProgress,
		[0.1, 0.2, 0.3],
		['1.5rem', '0.5rem', '0rem']
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
