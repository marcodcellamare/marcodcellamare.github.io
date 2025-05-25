import Blob from '@components/Misc/Blob';
import Carousel from '../Views/Carousel';
import { ImageTemplate } from '@interfaces/template/image';
//import '@styles/components/Images.scss';

const Images = ({
	images,
	blob,
}: {
	images: ImageTemplate[];
	blob?: boolean;
}) => {
	return images ? (
		blob ? (
			<Blob className='section-images'>
				<Carousel images={images} />
			</Blob>
		) : (
			<Carousel
				className='section-images'
				images={images}
			/>
		)
	) : null;
};
export default Images;
