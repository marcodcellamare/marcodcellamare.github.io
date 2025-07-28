import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openExternalLink } from '@/utils/misc';
import { useFirebase } from '@/contexts/firebase';
import classNames from 'classnames';

import Icon from './Icon';
import { CHARACTERS } from '@const';

import { TimeoutType, IntervalType } from '@/types/misc';

import moods from '@/assets/moods.json' assert { type: 'json' };
import '@/styles/components/elements/Moods.css';

type MoodStatusType = 'idle' | 'init' | 'typing' | 'typed';

export type MoodCategoryType =
	| 'love'
	| 'hate'
	| 'listenTo'
	| 'makeMusicWith'
	| 'play'
	| 'design'
	| 'code';

type MoodType =
	| {
			title: string;
			link: string;
	  }
	| string;

type MoodsType = {
	[K in MoodCategoryType]: MoodType[];
};

interface MoodsProps {
	className?: string;
}

const Moods = ({ className }: MoodsProps) => {
	const { t } = useTranslation();
	const { logEvent } = useFirebase();

	const [status, setStatus] = useState<MoodStatusType>('idle');
	const [currentCategory, setCurrentCategory] = useState<MoodCategoryType>();
	const [currentIdx, setCurrentIdx] = useState<number>(-1);
	const [typed, setTyped] = useState('');
	const [isOver, setIsOver] = useState(false);

	const timeoutRef = useRef<TimeoutType>(null);
	const intervalRef = useRef<IntervalType>(null);

	const typedRef = useRef<string[]>([]);
	const isWrongRef = useRef(false);

	const data = moods as MoodsType;

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

	const currentTitle = useMemo(
		() =>
			currentCategory !== undefined && currentIdx >= 0
				? typeof data[currentCategory][currentIdx] === 'object'
					? data[currentCategory][currentIdx].title
					: data[currentCategory][currentIdx]
				: '',
		[data, currentCategory, currentIdx]
	);
	const currentFullTitle = useMemo(
		() =>
			`${t('moods.I')} ${t(
				`moods.${currentCategory}`
			).toLowerCase()} ${currentTitle}`,
		[currentCategory, currentTitle, t]
	);
	const currentLink = useMemo(
		() =>
			status === 'typed' &&
			currentCategory !== undefined &&
			currentIdx >= 0 &&
			typeof data[currentCategory][currentIdx] === 'object'
				? data[currentCategory][currentIdx].link
				: '',
		[data, currentCategory, currentIdx, status]
	);

	const getRandom = useRef((currentCategory?: MoodCategoryType) => {
		let category: MoodCategoryType;
		const categories = Object.keys(data) as MoodCategoryType[];

		do {
			category =
				categories[Math.floor(Math.random() * categories.length)];
		} while (category === currentCategory);

		const idx = Math.floor(Math.random() * data[category].length);

		setCurrentCategory(category);
		setCurrentIdx(idx);
	});

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
		getRandom.current(currentCategory);
	}, [currentCategory]);

	const handleClick = () => {
		if (!currentLink) return;

		openExternalLink(currentLink);
		logEvent('mood_link', {
			title: currentFullTitle,
			currentLink,
		});
	};

	const typing = useCallback(() => {
		if (!currentTitle) return idle();

		setStatus('typing');

		let wrongCharacter = '';

		// If last character was wrong, remove it
		if (isWrongRef.current) typedRef.current.pop();

		const nextChar = currentTitle[typedRef.current.length];

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
	}, [currentTitle, idle]);

	useEffect(() => {
		idle();

		return () => {
			timeoutCleanup();
			intervalCleanup();
		};
	}, [idle]);

	useEffect(() => {
		getRandom.current();
	}, []);

	// Handle status transitions
	useEffect(() => {
		if (status === 'idle') {
			timeoutCleanup();
			timeoutRef.current = setTimeout(init, 500);
		}
	}, [status, init]);

	// Start typing only after current.title is ready
	useEffect(() => {
		if (status === 'init' && currentTitle) {
			timeoutCleanup();
			timeoutRef.current = setTimeout(() => {
				intervalRef.current = setInterval(typing, 80);
			}, 500);
		}
	}, [status, currentTitle, typing]);

	// Handle auto-restart unless hovering
	useEffect(() => {
		if (status === 'typed') {
			if (!isOver) {
				timeoutRef.current = setTimeout(
					idle,
					currentLink ? 5000 : 2000
				);
			} else {
				timeoutCleanup();
			}
		}
	}, [status, isOver, idle, currentLink]);

	if (!currentCategory || currentIdx < 0) return null;

	return (
		<button
			type='button'
			role={currentLink ? 'button' : undefined}
			className={classNames([
				'moods btn btn-link !no-underline max-w-full whitespace-nowrap',
				currentLink
					? 'text-(--color-theme-link) cursor-pointer'
					: 'text-(--color-theme-content) cursor-default',
				className,
			])}
			disabled={!currentLink}
			aria-label={currentFullTitle}
			title={currentFullTitle}
			onPointerEnter={currentLink ? () => setIsOver(true) : undefined}
			onPointerLeave={currentLink ? () => setIsOver(false) : undefined}
			onClick={currentLink ? handleClick : undefined}>
			{t('moods.I')}
			<Icon
				category={currentCategory}
				isVisible={status !== 'idle'}
				className={classNames([
					'transition-[scale] duration-200 ease-in-out',
					{
						'scale-140': isOver,
					},
				])}
			/>
			<span className='truncate'>
				{typed}
				<span className='moods-cursor'>_</span>
			</span>
		</button>
	);
};
export default Moods;
