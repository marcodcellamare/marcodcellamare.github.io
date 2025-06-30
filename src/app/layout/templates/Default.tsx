import { useSection } from '!/contexts/section';
import { useSettings } from '!/contexts/settings';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useParallax } from '!/contexts/parallax';
import { easeInOut, motion, useScroll, useTransform } from 'motion/react';
import classNames from 'classnames';

import Container from '!/app/layout/elements/Container';
import Content from '!/app/layout/elements/content';
import Image from '!/app/layout/elements/Image';

interface DefaultProps {
	slideId?: number;
}

const Default = ({ slideId = 0 }: DefaultProps) => {
	const { pageId } = useRouter();
	const { i18n, t } = useTranslation(pageId);
	const { sectionId, sectionRef } = useSection();
	const { spaceRef } = useSettings();
	const { getScrollConfig } = useParallax();

	const rootKey = `sections.${sectionId}.content.${slideId}`;
	const imageExists = i18n.exists(`${rootKey}.image`, {
		ns: pageId,
	});

	const position = t(`${rootKey}.image.position`, 'left') as 'left' | 'right';
	const isBlob = t(`${rootKey}.image.blob`, {
		returnObjects: true,
		defaultValue: false,
	}) as unknown as boolean;

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
				'flex flex-col lg:flex-row lg:items-center relative',
				spaceRef.current.content,
				spaceRef.current.section,
			])}>
			{imageExists && (
				<motion.div
					className={classNames([
						'flex lg:flex-1 shrink-0 min-w-0',
						{
							'lg:justify-end': position === 'left',
							'lg:order-last lg:justify-start':
								position === 'right',
						},
					])}
					style={{ y, scale }}>
					<Image
						rootKey={`${rootKey}.image`}
						className={classNames([
							'h-60 lg:h-auto xl:translate-x-0',
							'transition-[scale,filter] duration-200 ease-in-out',
							'scale-190 xl:scale-170 2xl:scale-160 z-0',
							'hover:scale-195 hover:xl:scale-175 hover:2xl:scale-165 hover:z-2',
							'hover:drop-shadow-2xl/30',
							{
								'lg:scale-250 hover:lg:scale-255': isBlob,

								'lg:-translate-x-2/20':
									isBlob && position === 'left',
								'lg:translate-x-2/20 ':
									isBlob && position === 'right',
								'translate-x-3/20 lg:translate-x-0 -translate-y-1/20 lg:translate-y-0':
									!isBlob,

								'lg:origin-right':
									!isBlob && position === 'left',
								'lg:origin-left':
									!isBlob && position === 'right',
							},
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
						: 'lg:basis-8/12 xl:basis-7/12',
				])}
			/>
		</Container>
	);
};
export default Default;
