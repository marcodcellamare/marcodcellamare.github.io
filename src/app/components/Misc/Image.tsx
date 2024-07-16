const Image = ({
	src,
	srcSm,
	alt,
	className = '',
	style,
}: {
	src: string;
	srcSm?: string;
	alt?: string;
	className?: string;
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
			style={style}
			alt={alt ?? src}
			loading='lazy'
		/>
	);
};
export default Image;
