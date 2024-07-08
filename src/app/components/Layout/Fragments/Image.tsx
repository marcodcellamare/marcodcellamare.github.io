import '@styles/components/SectionImages.scss';

const Image = ({
	src,
	srcSm,
	className = '',
	alt,
	style,
}: {
	src: string;
	srcSm?: string;
	className?: string;
	alt?: string;
	style?: React.CSSProperties;
}) => {
	return (
		<img
			src={`${process.env.PUBLIC_URL}/images/${src}`}
			srcSet={
				(srcSm
					? `${process.env.PUBLIC_URL}/images/${srcSm} 800w, `
					: '') + `${process.env.PUBLIC_URL}/images/${src} 1000w`
			}
			sizes={(srcSm ? '(max-width: 800px) 800w, ' : '') + '1000w'}
			className={className}
			alt={alt ?? src}
			loading='lazy'
			style={style}
		/>
	);
};
export default Image;
