import { useSection } from '@/contexts/section';

import Picture from '@/app/misc/picture';
import Floating from '@/app/misc/Floating';
import classNames from 'classnames';

const Background = () => {
	const { background } = useSection();

	if (!background.src) return;

	return (
		<div
			className={classNames([
				'absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-2 perspective-midrange',
				{
					'm-10 lg:m-20': background?.contain,
				},
			])}>
			<Floating
				mode='repel'
				ratioX={30}
				ratioY={30}
				duration={3}
				changePerspective={true}
				maxRotation={5}
				className='absolute top-0 bottom-0 left-0 right-0'>
				<Picture
					src={background.src}
					contain={background?.contain}
					pictureClassName='absolute top-0 bottom-0 left-0 right-0'
					async={true}
				/>
			</Floating>
		</div>
	);
};
export default Background;
