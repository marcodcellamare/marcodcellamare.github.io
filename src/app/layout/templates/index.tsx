import { Fragment, JSX, useRef } from 'react';
import { useParallax } from '@/contexts/parallax';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useSection } from '@/contexts/section';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import Container from '@/app/layout/elements/Container';
import Default from './Default';
import Carousel from './Carousel';
import Brands from './Brands';
import Gallery from './Gallery';

const Templates = () => {
	const spacing = useUIStore((state) => state.spacing);
	const { template, sectionRef } = useSection();
	const { getScrollConfig } = useParallax();

	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	let content: JSX.Element;

	const y = useTransform(scrollYProgress, [0, 1], ['-5rem', '5rem']);
	const scale = useTransform(scrollYProgress, [0.9, 1], [1, 0.98], {
		ease: easeInOut,
	});
	const opacity = useTransform(
		scrollYProgress,
		[0.1, 0.2, 0.9, 1],
		[0, 1, 1, 0]
	);
	const blurAmount = useTransform(
		scrollYProgress,
		[0, 0.4, 0.8, 1],
		['1.6rem', '0rem', '0rem', '1rem']
	);
	const filter = useTransform(blurAmount, (value) => `blur(${value})`);

	const containerClassName = classNames([
		'flex flex-col justify-center lg:flex-row lg:justify-normal lg:items-center relative',
		spacing.content,
		spacing.section,
	]);

	switch (template) {
		case 'default':
			content = (
				<Container className={containerClassName}>
					<Default className='flex-1' />
				</Container>
			);
			break;

		case 'carousel':
			content = <Carousel template={<Default />} />;
			break;

		case 'brands':
			content = (
				<Container className={containerClassName}>
					<Brands />
				</Container>
			);
			break;

		case 'gallery':
			content = (
				<Gallery
					className={classNames(['flex-1', spacing.absEdgePadding])}>
					<Container
						className={classNames(
							'sticky top-0 left-0 right-0 h-(--main-vh)',
							containerClassName
						)}>
						<Default className='flex-1' />
					</Container>
				</Gallery>
			);
			break;

		default:
			content = <Fragment />;
	}

	return (
		<motion.div
			ref={targetRef}
			style={{ y, scale, opacity, filter }}
			className='template-wrapper flex items-center w-full relative z-2'>
			{content}
		</motion.div>
	);
};
export default Templates;
