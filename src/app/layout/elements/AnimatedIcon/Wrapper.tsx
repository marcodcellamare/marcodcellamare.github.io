import { Fragment } from 'react/jsx-runtime';

import Hello from './icons/Hello';
import Development from './icons/Development';

import { ImageIconType } from '@/types/layout';

interface WrapperProps {
	icon: ImageIconType;
	className?: string;
}

const Wrapper = ({ icon, className }: WrapperProps) => {
	const props = {
		className,
	};
	switch (icon) {
		case 'icon:hello':
			return <Hello {...props} />;

		case 'icon:development':
			return <Development {...props} />;
	}
	return <Fragment />;
};

export default Wrapper;
