import classNames from 'classnames';

import Picture from '@/app/misc/picture';

interface GalleryProps {
	className?: string;
}

const Gallery = ({ className }: GalleryProps) => {
	const gap = 'gap-10 xl:gap-20';

	return (
		<div className={classNames(['gallery flex border', gap, className])}>
			<div className='flex basis-1/4 items-center'>
				<Picture
					src='/images/marco-d-cellamare-full.jpg'
					className='rounded-md'
				/>
			</div>
			<div className={classNames(['flex flex-1 items-center', gap])}>
				<div
					className={classNames([
						'flex flex-col flex-1 border',
						gap,
					])}>
					<div className='border flex-1'>x</div>
					<div className='border flex-1'>x</div>
					<div className='border flex-1'>x</div>
				</div>
				<div className='border flex-1'>2</div>
			</div>
		</div>
	);
};
export default Gallery;
