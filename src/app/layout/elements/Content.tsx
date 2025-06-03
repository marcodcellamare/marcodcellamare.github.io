import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from '!/contexts/router';
import classNames from 'classnames';

import { useParallax } from '!/contexts/parallax';

import '!/styles/components/elements/Content.css';

interface ContentProps {
	sectionId: number;
	className?: string;
}

const Content = ({ sectionId, className = '' }: ContentProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);

	const targetRef = useRef<HTMLDivElement>(null);

	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(targetRef));

	const y = useTransform(scrollYProgress, [0, 1], ['-5rem', '5rem']);
	const rotateX = useTransform(
		scrollYProgress,
		[0, 0.25, 0.75, 1],
		['10deg', '2deg', '-2deg', '-10deg']
	);

	const h1Exists = i18n.exists(`${pageId}:sections.${sectionId}.heading.h1`);
	const h2Exists = i18n.exists(`${pageId}:sections.${sectionId}.heading.h2`);
	const h3Exists = i18n.exists(`${pageId}:sections.${sectionId}.heading.h3`);
	const contentExists = i18n.exists(
		`${pageId}:sections.${sectionId}.content`
	);

	return (
		<div
			ref={targetRef}
			className={classNames(['content perspective-distant', className])}>
			<motion.div style={{ y, rotateX }}>
				{(h1Exists || h2Exists || h3Exists) && (
					<div className='headings'>
						{h1Exists && (
							<h2 className='h1 text-primary mb-3'>
								{t(`sections.${sectionId}.heading.h1`)}
							</h2>
						)}
						{h2Exists && (
							<h3 className='h2 text-secondary'>
								{t(`sections.${sectionId}.heading.h2`)}
							</h3>
						)}
						{h3Exists && (
							<h4 className='h3 text-accent'>
								{t(`sections.${sectionId}.heading.h3`)}
							</h4>
						)}
					</div>
				)}
				{contentExists && (
					<Trans
						i18nKey={`${pageId}:sections.${sectionId}.content`}
						components={{
							h4: <h5 className='h4 text-accent' />,
							h5: <h6 className='h5 text-accent' />,
							h6: <h6 className='h6 text-accent' />,
						}}
					/>
				)}
			</motion.div>
		</div>
	);
};
export default Content;
