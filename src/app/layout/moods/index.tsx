import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openExternalLink } from '!/utils/misc';
import classNames from 'classnames';

import Icon from './Icon';
import { CHARACTERS } from '!const';

import { MoodInterface, MoodStatusType } from '!/types/moods';
import { TimeoutType, IntervalType } from '!/types/misc';

import moods from '!/assets/moods.json' assert { type: 'json' };
import '!/styles/components/Moods.css';

//import ReactGA from 'react-ga4'

interface MoodsProps {
	className?: string;
}

const Moods = ({ className = '' }: MoodsProps) => {
	const { t } = useTranslation();
	const data = moods as MoodInterface[];

	const [status, setStatus] = useState<MoodStatusType>('idle');
	const [currentIdx, setCurrentIdx] = useState(-1);
	const [typed, setTyped] = useState('');
	const [isOver, setIsOver] = useState(false);

	const timeoutRef = useRef<TimeoutType>(null);
	const intervalRef = useRef<IntervalType>(null);

	const typedRef = useRef<string[]>([]);
	const isWrongRef = useRef(false);

	const current = useMemo(
		() =>
			data[currentIdx] ?? {
				type: 'love',
				title: '',
			},
		[data, currentIdx]
	);

	const timeoutCleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const intervalCleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const getRandom = useCallback(
		() =>
			setCurrentIdx((prev) => {
				if (data.length === 0) return -1;
				if (data.length === 1) return 0;

				let idx: number;
				do {
					idx = Math.floor(Math.random() * data.length);
				} while (idx === prev);

				return idx;
			}),
		[data.length]
	);

	const idle = useCallback(() => {
		setStatus('idle');
		setTyped('');
		typedRef.current = [];
		isWrongRef.current = false;
	}, []);

	const init = useCallback(() => {
		setStatus('init');
		setTyped('');
		typedRef.current = [];
		isWrongRef.current = false;
		getRandom();
	}, [getRandom]);

	const typing = useCallback(() => {
		if (!current.title) return idle();

		setStatus('typing');

		let wrongCharacter = '';

		// If last character was wrong, remove it
		if (isWrongRef.current) typedRef.current.pop();

		const nextChar = current.title[typedRef.current.length];

		if (!nextChar) {
			setStatus('typed');
			intervalCleanup();
			return;
		}

		// Calculates if the next char has to be wrong
		isWrongRef.current =
			typedRef.current.length > 0 && Math.random() * 10 < 3;

		if (isWrongRef.current) {
			// If it has to be a wrong char, pick a new random one
			// that is different from the actual one

			do {
				wrongCharacter = CHARACTERS.charAt(
					Math.floor(Math.random() * CHARACTERS.length)
				);
			} while (wrongCharacter === nextChar);

			// Add the wrong char to the array
			typedRef.current.push(wrongCharacter);
		} else {
			// Add the right char to the array
			typedRef.current.push(nextChar);
		}

		setTyped(typedRef.current.join(''));
	}, [current, idle]);

	useEffect(() => {
		idle();

		return () => {
			timeoutCleanup();
			intervalCleanup();
		};
	}, [idle]);

	// Handle status transitions
	useEffect(() => {
		if (status === 'idle') {
			timeoutCleanup();
			timeoutRef.current = setTimeout(init, 500);
		}
	}, [status, init]);

	// Start typing only after current.title is ready
	useEffect(() => {
		if (status === 'init' && current.title) {
			timeoutCleanup();
			timeoutRef.current = setTimeout(() => {
				intervalRef.current = setInterval(typing, 80);
			}, 500);
		}
	}, [status, current.title, typing]);

	// Handle auto-restart unless hovering
	useEffect(() => {
		if (status === 'typed') {
			if (!isOver) {
				timeoutRef.current = setTimeout(idle, 2000);
			} else {
				timeoutCleanup();
			}
		}
	}, [status, isOver, idle]);

	/*
	const onClick = (label: string) => {
		// Google Analytics
		
		ReactGA.event({
			category: 'Love',
			action: 'click',
			label: label,
		});
	};
	*/

	return (
		<button
			type='button'
			className={classNames([
				'moods btn btn-link no-underline',
				current.link
					? 'text-[var(--color-link)]'
					: 'text-[var(--color-content)]',
				className,
			])}
			title={
				currentIdx >= 0
					? `${t('moods.I')} ${t(
							`moods.${current.type}`
					  ).toLowerCase()} ${current.title}`
					: ''
			}
			disabled={!current.link}
			onPointerEnter={() => setIsOver(true)}
			onPointerLeave={() => {
				setIsOver(false);
				if (status === 'typed') idle();
			}}
			onClick={() =>
				current.link ? openExternalLink(current.link) : null
			}>
			{t('moods.I')}
			{currentIdx >= 0 ? (
				<>
					{status !== 'idle' ? <Icon type={current.type} /> : null}
					<span>
						{typed}
						<span className='moods-cursor'>_</span>
					</span>
					{status === 'typed' && current.link ? (
						<Icon type='go' />
					) : null}
				</>
			) : null}
		</button>
	);
};
export default Moods;
