import {
	TransitionEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import {
	ArrowRightShort,
	Boombox,
	CodeSquare,
	HandThumbsDown,
	Heart,
	Joystick,
} from 'react-bootstrap-icons';
import LoveInterface from '@interfaces/love';
import Data from '@assets/data/Love.json';
import '@styles/components/Love.scss';

const Love = ({ className = '' }: { className?: string }) => {
	const { i18n } = useTranslation();

	const [picked, setPicked] = useState<LoveInterface>({
		type: 'love',
		title: '',
		link: '',
	});
	const [status, setNextStatus] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [showLink, setShowLink] = useState<boolean>(false);
	const [over, setOver] = useState<boolean>(false);
	const [typed, setTyped] = useState<string>('');

	const json = useRef<LoveInterface[]>(Data as LoveInterface[]);
	const id = useRef<number>(-1);
	const _typed = useRef({
		chars: [],
		wrong: false,
	});
	const timerStarted = useRef(null);
	const timerTyping = useRef(null);
	const timerTyped = useRef(null);
	const timerLink = useRef(null);

	// Function called in an interval, that simulates the sentence typing

	const typing = useCallback(() => {
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let wrongCharacter = '';

		if (_typed.current.wrong) {
			// If the previous added char was wrong, remove it from the array
			_typed.current.chars.pop();
		}

		// Calculates if the next char has to be wrong
		_typed.current.wrong =
			_typed.current.chars.length > 0 && Math.random() * 10 < 3;

		if (_typed.current.wrong) {
			// If it has to be a wrong char, pick a new random one
			//  that is different from the actual one

			do {
				wrongCharacter = characters.charAt(
					Math.floor(Math.random() * characters.length)
				);
			} while (
				wrongCharacter === picked.title[_typed.current.chars.length]
			);

			// Add the wrong char to the array
			_typed.current.chars.push(wrongCharacter);
		} else {
			// Add the right char to the array
			_typed.current.chars.push(
				picked.title[_typed.current.chars.length]
			);
		}
		if (_typed.current.chars.length > picked.title.length) {
			// When finished, clear the timing function and call onTyped
			setNextStatus('typed');
		} else {
			// Set the typed state
			setTyped(_typed.current.chars.join(''));
		}
	}, [picked.title]);

	// Function that clears all the timers

	const clear = useRef(() => {
		clearTimeout(timerStarted.current);
		clearInterval(timerTyping.current);
		clearTimeout(timerTyped.current);
		clearTimeout(timerLink.current);
	});

	//

	const onTransitionEnd = (
		e: TransitionEvent<HTMLDivElement> & {
			target: HTMLDivElement;
		}
	) => {
		// When the icon disappears, the cycle ends

		if (
			e.propertyName === 'opacity' &&
			e.target.classList.contains('love-icon') &&
			!show
		)
			setNextStatus('ended');
	};

	const onStart = useCallback(() => {
		let k: number = -1;

		do {
			k = Math.floor(Math.random() * json.current.length);
		} while (k === id.current);

		setPicked({
			type: json.current[k].type,
			title: json.current[k].title,
			link: json.current[k].link,
		});
		setNextStatus('started');

		// Clear the timing function on unmount
		return () => clear.current();
	}, []);

	const onStarted = useCallback(() => {
		if (picked.title) {
			timerStarted.current = setTimeout(() => {
				setShow(true);

				// Start the typing flow
				timerStarted.current = setTimeout(() => {
					setNextStatus('typing');
				}, 500);
			}, 50);
		}
	}, [picked]);

	const onTyping = useCallback(() => {
		if (show) timerTyping.current = setInterval(typing, 80);
	}, [show, typing]);

	const onTyped = useCallback(() => {
		if (!showLink) {
			// Show the link icon

			clearTimeout(timerLink.current);
			timerLink.current = setTimeout(() => {
				setShowLink(true);
			}, 50);
		}

		if (!over) {
			// If not over, move to the next step

			clearTimeout(timerTyped.current);
			timerTyped.current = setTimeout(() => {
				_typed.current = {
					chars: [],
					wrong: false,
				};
				setShow(false);
				setTyped('');
			}, 2000);
		}
	}, [over, showLink]);

	const onEnded = useCallback(() => {
		// Starts again
		setNextStatus('start');
	}, []);

	const onHover = (over: boolean) => {
		// Set the over state
		setOver(over);
	};
	const onClick = (label: string) => {
		// Google Analytics
		ReactGA.event({
			category: 'Love',
			action: 'click',
			label: label,
		});
	};

	//

	useEffect(() => setNextStatus('start'), []);

	useEffect(() => {
		// This hook controls the cycle of the component
		clear.current();

		switch (status) {
			case 'start':
				onStart();
				break;

			case 'started':
				onStarted();
				break;

			case 'typing':
				onTyping();
				break;

			case 'typed':
				onTyped();
				break;

			case 'ended':
				onEnded();
				break;

			default:
		}
	}, [status, onStart, onStarted, onTyping, onTyped, onEnded]);

	return (
		<div
			className={`love${show ? ' show' : ''}${
				over ? ' over' : ''
			} text-success fw-bold ${className}`.trim()}
			onMouseEnter={() => onHover(true)}
			onMouseLeave={() => onHover(false)}
			onTransitionEnd={onTransitionEnd}
			title={`${i18n.t('com.I')} ${i18n
				.t(`com.${picked.type.toUpperCase()}`)
				.toLowerCase()} ${picked.title}`}>
			{i18n.t('com.I')}{' '}
			<Icon
				className='love-icon mx-2'
				type={picked.type}
				title={i18n.t(`com.${picked.type.toUpperCase()}`)}
			/>{' '}
			{typed}
			<span className='love-cursor'>_</span>
			{picked.link && typed.length === picked.title.length ? (
				<a
					className={`love-link${
						showLink ? ' show' : ''
					} link-success link-underline-opacity-0`}
					href={picked.link}
					target='_blank'
					rel='noreferrer'
					onClick={() =>
						onClick(
							`${i18n.t('com.I')} ${i18n
								.t(`com.${picked.type.toUpperCase()}`)
								.toLowerCase()} ${picked.title}`
						)
					}>
					<ArrowRightShort />
				</a>
			) : null}
		</div>
	);
};

// Component to pick the right icon

const Icon = ({
	type,
	title,
	className,
}: {
	type?: string;
	title?: string;
	className?: string;
}) => {
	const props = {
		title: title,
		className: className ? className : null,
	};
	switch (type) {
		case 'hate':
			return <HandThumbsDown {...props} />;

		case 'music':
			return <Boombox {...props} />;

		case 'play':
			return <Joystick {...props} />;

		case 'code':
			return <CodeSquare {...props} />;

		case 'love':
		default:
			return <Heart {...props} />;
	}
};
export default Love;
