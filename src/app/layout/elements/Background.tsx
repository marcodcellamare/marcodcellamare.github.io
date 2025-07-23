import { useSection } from '@/contexts/section';

import Picture from '@/app/misc/picture';
import Floating from '@/app/misc/Floating';

const Background = () => {
	const { settings } = useSection();

	if (!settings?.background?.src) return;

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 m-10 lg:m-20 pointer-events-none z-2 perspective-midrange'>
			<Floating
				mode='repel'
				ratioX={30}
				ratioY={30}
				duration={3}
				changePerspective={true}
				maxRotation={5}
				className='absolute top-0 bottom-0 left-0 right-0'>
				<Picture
					src={settings.background.src}
					contain={settings?.background?.contain}
					pictureClassName='absolute top-0 bottom-0 left-0 right-0'
					async={true}
				/>
			</Floating>
		</div>
	);
};
export default Background;
