import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import {
	BinaryIcon,
	CircleGaugeIcon,
	DraftingCompassIcon,
	RotateCwIcon,
	SparklesIcon,
} from 'lucide-react';

import { TimeoutType } from '@/types/misc';

import '@/styles/components/elements/AnimatedIcon/Development.css';

type StatusType = 'idea' | 'design' | 'code' | 'performance' | 'repeat';

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
		case 'idea':
			return <SparklesIcon className={className} />;

		case 'design':
			return <DraftingCompassIcon className={className} />;

		case 'code':
			return <BinaryIcon className={className} />;

		case 'performance':
			return <CircleGaugeIcon className={className} />;

		case 'repeat':
			return <RotateCwIcon className={className} />;
	}
};

const Development = ({ className }: WrapperProps) => {
	const allStatus = useRef<Record<StatusType, number>>({
		idea: 1500,
		design: 3000,
		code: 2000,
		performance: 4500,
		repeat: 1500,
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
				'animated-icon development flex flex-1',
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

export default Development;
