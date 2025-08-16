import { Fragment } from 'react/jsx-runtime';

import Hello from './Hello';

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
	}
	return <Fragment />;
};

export default Wrapper;
