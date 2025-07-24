import { useSection } from '@/contexts/section';
import classNames from 'classnames';

import Picture, { PictureProps } from '@/app/misc/picture';
import Floating from '@/app/misc/Floating';

const Background = () => {
	const { background } = useSection();

	if (!background.src) return;

	const props = {
		...background,
		pictureClassName: 'absolute top-0 bottom-0 left-0 right-0',
		async: true,
	} as PictureProps;

	return background?.contain ? (
		<Floating
			mode='repel'
			ratioX={50}
			ratioY={50}
			duration={0.1}
			className={classNames([
				'absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
				background.className,
				{
					'm-10 lg:m-20': background?.contain,
				},
			])}>
			<Picture {...props} />
		</Floating>
	) : (
		<Picture {...props} />
	);
};
export default Background;
