import classNames from 'classnames';

import Wrapper from './Wrapper';

import { ImageIconType } from '@/types/layout';

interface AnimatedIconProps {
	icon: ImageIconType;
	className?: string;
}

const AnimatedIcon = ({ icon, className }: AnimatedIconProps) => (
	<div className={classNames(['animated-icon relative', className])}>
		<Wrapper
			icon={icon}
			className='flex-1 h-full stroke-[0.3]'
		/>
	</div>
);
export default AnimatedIcon;
