import { useSection } from '!/contexts/section';
import { useSettings } from '!/contexts/settings';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';
import { easeInOut, motion, useScroll, useTransform } from 'motion/react';
import classNames from 'classnames';

import Container from '../../elements/Container';
import Content from '../../elements/content';
import Image from '../../elements/Image';

const Default = () => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { spaceRef } = useSettings();
	const { getScrollConfig } = useParallax();

	const rootKey = `sections.${sectionId}.content.0`;
	const imageExists = i18n.exists(`${rootKey}.image`, {
		ns: pageId,
	});

	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));
	const y = useTransform(scrollYProgress, [0, 1], ['25rem', '-25rem'], {
		ease: easeInOut,
	});
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1], {
		ease: easeInOut,
	});

	return (
		<Container
			className={classNames([
				'flex flex-col lg:flex-row lg:items-center',
				spaceRef.current.content,
			])}>
			{imageExists && (
				<motion.div
					className={classNames([
						'lg:flex-1 shrink-0 min-w-0',
						{
							'lg:order-last':
								t(`${rootKey}.image.position`) === 'right',
						},
					])}
					style={{ y, scale }}>
					<Image
						rootKey={`${rootKey}.image`}
						className={classNames([
							'h-60 lg:h-auto lg:-translate-x-1/20 lg:-translate-y-5/20',
							'transition-[scale,filter] duration-200 ease-in-out',
							'scale-190 lg:scale-350 xl:scale-160 2xl:scale-130 z-0',
							'hover:scale-195 hover:lg:scale-355 hover:xl:scale-165 hover:2xl:scale-135 hover:z-2',
							'drop-shadow-2xl/5 hover:drop-shadow-2xl/30',
						])}
					/>
				</motion.div>
			)}
			<Content
				rootKey={rootKey}
				className={classNames([
					'min-w-0 z-1',
					!imageExists
						? 'lg:basis-10/12 xl:basis-9/12'
						: 'lg:basis-9/12 xl:basis-7/12',
				])}
			/>
		</Container>
	);
};

export default Default;
