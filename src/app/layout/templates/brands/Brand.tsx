import { useRef } from 'react';
import { motion, easeInOut, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/contexts/parallax';
import { useSection } from '@/contexts/section';
import { random } from '@/utils/math';
import classNames from 'classnames';

import Icon from './Icon';

interface BrandProps {
	name: string;
	title: string;
	className?: string;
}

const Brand = ({ name, title, className }: BrandProps) => {
	const { sectionRef } = useSection();
	const { getScrollConfig } = useParallax();
	const { scrollYProgress } = useScroll(getScrollConfig(sectionRef));

	const randomX = useRef(Math.round(random({ min: 0, max: 2 }) * 10) / 10);
	const randomXRange = useRef(
		[`${randomX.current}rem`, `-${randomX.current}rem`].sort(
			() => Math.random() - 0.5
		)
	);
	const x = useTransform(scrollYProgress, [0, 1], randomXRange.current, {
		ease: easeInOut,
	});

	return (
		<motion.button
			type='button'
			className={classNames([
				'template-brands-brand relative aspect-square group',
				className,
			])}
			style={{ x }}>
			<Icon
				name={name}
				className='absolute top-1/2 left-1/2 -translate-1/2 w-full h-6/10 fill-(--color-theme-link) group-hover:fill-(--color-theme-foreground)/50 transition-[filter,scale,fill] duration-1000 ease-in-out group-hover:blur-xxs group-hover:scale-180 pointer-events-none'
			/>
			<h4 className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3 min-w-2/1 px-2 py-1 text-xs uppercase font-black text-(--color-theme-link) text-center transition-[opacity,translate] duration-400 ease-in-out delay-100 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 pointer-events-none'>
				{title}
			</h4>
		</motion.button>
	);
};
export default Brand;
