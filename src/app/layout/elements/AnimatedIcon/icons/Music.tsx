import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import {
	BoomBoxIcon,
	Disc3Icon,
	MicVocalIcon,
	TheaterIcon,
} from 'lucide-react';

import { TimeoutType } from '@/types/misc';

import '@/styles/components/elements/AnimatedIcon/Music.css';

type StatusType = 'listen' | 'rapping' | 'album' | 'stage';

interface WrapperProps {
	className?: string;
}

const Icons = ({
	status,
	className,
}: {
	status: StatusType;
	className?: string;
}) => {
	switch (status) {
		case 'listen':
			return <BoomBoxIcon className={className} />;

		case 'rapping':
			return <MicVocalIcon className={className} />;

		case 'album':
			return <Disc3Icon className={className} />;

		case 'stage':
			return <TheaterIcon className={className} />;
	}
};

const Music = ({ className }: WrapperProps) => {
	const allStatus = useRef<Record<StatusType, number>>({
		listen: 1500,
		rapping: 2000,
		album: 1500,
		stage: 2000,
	});
	const allStatusKeys = useRef<StatusType[]>(
		Object.keys(allStatus.current) as StatusType[]
	);
	const timeoutRef = useRef<TimeoutType>(null);
	const timeoutChangingRef = useRef<TimeoutType>(null);

	const [status, setIsStatus] = useState<StatusType>(
		allStatusKeys.current[0]
	);
	const [isChanging, setIsChanging] = useState(false);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		if (timeoutChangingRef.current !== null) {
			clearTimeout(timeoutChangingRef.current);
			timeoutChangingRef.current = null;
		}
	};

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setIsStatus(
				(prev) =>
					allStatusKeys.current[
						allStatusKeys.current.indexOf(prev) + 1
					] ?? allStatusKeys.current[0]
			);
		}, allStatus.current[status]);

		return () => {
			cleanup();
		};
	}, [status]);

	useEffect(() => {
		setIsChanging(false);

		timeoutChangingRef.current = setTimeout(
			() => setIsChanging(true),
			allStatus.current[status] - 200
		);

		return () => {
			cleanup();
		};
	}, [status]);

	return (
		<div
			className={classNames([
				'animated-icon music flex flex-1',
				status,
				{
					changing: isChanging,
				},
			])}>
			<Icons
				status={status}
				className={className}
			/>
		</div>
	);
};

export default Music;
