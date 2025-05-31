import { ParallaxProps, useParallax } from 'react-scroll-parallax';

interface HeadingProps {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	parallaxProps?: ParallaxProps | false;
	className?: string;
	children: string;
}

const Heading = ({
	as: Tag = 'h2',
	parallaxProps = false,
	className = '',
	children = '',
}: HeadingProps) => {
	const { ref } = useParallax<HTMLDivElement>({
		...parallaxProps,
		disabled: parallaxProps === false,
		onProgressChange: (progress) =>
			console.log('scroll progress:', progress),
	});

	return (
		<Tag
			ref={ref}
			className={className}>
			{children}
		</Tag>
	);
};
export default Heading;
