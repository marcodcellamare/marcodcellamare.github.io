import { useEffect, useRef } from 'react';
import { Carousel as BsCarousel } from 'bootstrap/dist/js/bootstrap.esm.min.js';
import Image from '../Elements/Image';
import { ImageTemplate } from '@interfaces/template/image';

const Carousel = ({
	images,
	hover = false,
	className = '',
	style,
}: {
	images: ImageTemplate[];
	hover?: boolean;
	className?: string;
	style?: React.CSSProperties;
}) => {
	const ref = useRef();
	const carousel = useRef(null);

	useEffect(() => {
		if (ref.current) {
			carousel.current = new BsCarousel(ref.current, {
				ride: 'carousel',
				interval: 4000,
			});
			return () => carousel.current.dispose();
		}
	}, []);

	useEffect(() => {
		if (carousel.current) {
			if (hover) {
				carousel.current.pause();
			} else {
				carousel.current.cycle();
			}
		}
	}, [hover]);

	return images.length > 0 ? (
		<div
			ref={ref}
			className={`carousel slide ${className}`.trim()}
			style={style}>
			<div className='carousel-inner pe-none'>
				{images.map((image, k) => {
					return (
						<div
							key={k}
							className={`carousel-item${
								k === 0 ? ' active' : ''
							}`}>
							<Image
								src={image.file}
								srcSm={image.fileSm}
								className='object-fit-contain w-100'
								style={
									style
										? {
												width: style.width,
												height: style.height,
										  }
										: null
								}
							/>
						</div>
					);
				})}
			</div>
		</div>
	) : null;
};
export default Carousel;
