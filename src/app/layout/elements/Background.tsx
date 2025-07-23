import { useSection } from '@/contexts/section';

import Picture from '@/app/misc/picture';
import classNames from 'classnames';

const Background = () => {
	const { background } = useSection();

	if (!background.src) return;

	return (
		<div
			className={classNames([
				'absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
				background.className,
				{
					'm-10 lg:m-20': background?.contain,
				},
			])}>
			<Picture
				src={background.src}
				contain={background?.contain}
				pictureClassName='absolute top-0 bottom-0 left-0 right-0'
				async={true}
			/>
		</div>
	);
};
export default Background;
