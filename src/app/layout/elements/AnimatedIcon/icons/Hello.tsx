import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { HandIcon, HandMetalIcon } from 'lucide-react';

import { IntervalType, TimeoutType } from '@/types/misc';

import '@/styles/components/elements/AnimatedIcon/Hello.css';

interface WrapperProps {
	className?: string;
}

const Hello = ({ className }: WrapperProps) => {
	const [isRocking, setIsRocking] = useState(false);
	const [isChanging, setIsChanging] = useState(false);

	const timeoutRef = useRef<IntervalType>(null);
	const timeoutChangingRef = useRef<TimeoutType>(null);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearInterval(timeoutRef.current);
			timeoutRef.current = null;
		}
		if (timeoutChangingRef.current !== null) {
			clearTimeout(timeoutChangingRef.current);
			timeoutChangingRef.current = null;
		}
	};

	useEffect(() => {
		timeoutRef.current = setInterval(() => {
			setIsRocking((prev) => !prev);
		}, 5000);

		return () => {
			cleanup();
		};
	}, [isRocking]);

	useEffect(() => {
		setIsChanging(false);

		timeoutChangingRef.current = setTimeout(
			() => setIsChanging(true),
			5000 - 200
		);

		return () => {
			cleanup();
		};
	}, [isRocking]);

	return (
		<div
			className={classNames([
				'animated-icon hello flex flex-1',
				!isRocking ? 'waving' : 'rocking',
				{
					changing: isChanging,
				},
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
