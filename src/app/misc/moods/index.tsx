import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openExternalLink } from '!/utils/misc';

import Icon from './Icon';

import { MoodInterface, MoodStatusType } from '!/types/moods';
import { TimeoutType, IntervalType } from '!/types/misc';

import moods from '!/assets/moods.json' assert { type: 'json' };
import '!/styles/components/Moods.css';

//import ReactGA from 'react-ga4'

const Moods = () => {
	const { i18n } = useTranslation();
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
		getRandom();
	}, [getRandom]);

	const typing = useCallback(() => {
		if (!current.title) return idle();

		setStatus('typing');

		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let wrongCharacter = '';

		// If the previous added char was wrong, remove it from the array
		if (isWrongRef.current) typedRef.current.pop();

		// Calculates if the next char has to be wrong
		isWrongRef.current =
			typedRef.current.length > 0 && Math.random() * 10 < 3;

		if (isWrongRef.current) {
			// If it has to be a wrong char, pick a new random one
			// that is different from the actual one

			do {
				wrongCharacter = characters.charAt(
					Math.floor(Math.random() * characters.length)
				);
			} while (wrongCharacter === current.title[typedRef.current.length]);

			// Add the wrong char to the array
			typedRef.current.push(wrongCharacter);
		} else {
			// Add the right char to the array
			typedRef.current.push(current.title[typedRef.current.length]);
		}

		if (typedRef.current.length <= current.title.length) {
			setTyped(typedRef.current.join(''));
		} else {
			// Set the typed state
			setStatus('typed');
			intervalCleanup();
		}
	}, [current, idle]);

	useEffect(() => {
		idle();

		return () => {
			timeoutCleanup();
			intervalCleanup();
		};
	}, [idle]);

	useEffect(() => {
		switch (status) {
			case 'idle':
				timeoutCleanup();
				timeoutRef.current = setTimeout(init, 500);
				break;

			case 'init':
				timeoutCleanup();
				timeoutRef.current = setTimeout(
					() => (intervalRef.current = setInterval(typing, 80)),
					500
				);
				break;

			case 'typed':
				if (!isOver) {
					timeoutRef.current = setTimeout(idle, 2000);
				} else {
					timeoutCleanup();
				}
		}
	}, [status, isOver, idle, init, typing]);

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
			className='moods btn btn-link text-lg text-accent hover:text-base-100 no-underline hover:!no-underline'
			title={
				currentIdx >= 0
					? `${i18n.t('moods.I')} ${i18n
							.t(`moods.${current.type}`)
							.toLowerCase()} ${current.title}`
					: ''
			}
			disabled={!current.link}
			onPointerEnter={() => setIsOver(true)}
			onPointerLeave={() => setIsOver(false)}
			onClick={() =>
				current.link ? openExternalLink(current.link) : null
			}>
			{i18n.t('moods.I')}
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
