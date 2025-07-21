import { Fragment } from 'react/jsx-runtime';

import Hello from './Hello';

export type WrapperType = 'HELLO' | string;

interface WrapperProps {
	type: WrapperType;
	className?: string;
}

const Wrapper = ({ type, className }: WrapperProps) => {
	const props = {
		className,
	};
	switch (type) {
		case 'HELLO':
			return <Hello {...props} />;
	}
	return <Fragment />;
};

export default Wrapper;
