import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { HandIcon, HandMetalIcon } from 'lucide-react';

import { IntervalType } from '@/types/misc';
import '@/styles/components/elements/animated-icon/Hello.css';

export type WrapperType = 'HELLO' | string;

interface WrapperProps {
	className?: string;
}

const Hello = ({ className }: WrapperProps) => {
	const [isRocking, setIsRocking] = useState(false);

	const intervalRef = useRef<IntervalType>(null);

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setIsRocking((prev) => !prev);
		}, 5000);

		return () => {
			cleanup();
		};
	}, []);

	return (
		<div
			className={classNames([
				'animated-icon hello flex flex-1',
				!isRocking ? 'waving' : 'rocking',
			])}>
			{!isRocking ? (
				<HandIcon className={className} />
			) : (
				<HandMetalIcon className={className} />
			)}
		</div>
	);
};

export default Hello;
