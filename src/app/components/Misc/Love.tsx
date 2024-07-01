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
			clear.current();
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

	const onStart = () => {
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
	};

	const onStarted = useCallback(() => {
		if (picked.title) {
			timerStarted.current = setTimeout(() => {
				setShow(true);

				timerStarted.current = setTimeout(() => {
					setNextStatus('typing');
				}, 1000);
			}, 50);
		}
	}, [picked]);

	const onTyping = useCallback(() => {
		if (show) timerTyping.current = setInterval(typing, 80);
	}, [show, typing]);

	const onTyped = useCallback(
		(fromOver: boolean = false) => {
			if (!over) {
				console.log('>>>>>> onTyped');
				timerTyped.current = setTimeout(
					() => {
						_typed.current = {
							chars: [],
							wrong: false,
						};
						setShow(false);
						setTyped('');
					},
					!fromOver ? 3000 : 500
				);
			}
			timerLink.current = setTimeout(() => {
				setShowLink(true);
			}, 30);
		},
		[over]
	);

	const onEnded = () => {
		// Starts again
		setNextStatus('start');
	};
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
	}, [status, onStarted, onTyping, onTyped]);

	useEffect(() => {
		// This hook stops and play the cycle when
		// the user goes over the component

		if (status === 'typed') {
			if (!over) {
				// If no over (and it has been typed),
				// start the funcion again

				console.log('useEffect >>> typed', 'onTyped(true)');

				onTyped(true);
			} else {
				// If over, stop the timing functions

				console.log('useEffect >>> typed', 'clear.current()');
				clear.current();
			}
		}
	}, [over, status, onTyped]);

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

/*
import React from 'react';
import ReactGA from 'react-ga4';
import {
	ArrowRightShort,
	Boombox,
	CodeSquare,
	HandThumbsDown,
	Heart,
	Joystick,
} from 'react-bootstrap-icons';

import Data from '../../../assets/data/Love.json';
import '../../../styles/components/Love.scss';

class Love extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			showLink: false,
			k: false,
			over: false,
			type: '',
			title: '',
			titleTyping: '',
			link: '',
		};
		this.timeoutStarted = false;
		this.timeoutTyping = false;
		this.timeoutTyped = false;
		this.timeoutEnded = false;
		this.timeoutLink = false;
		this.intervalTyping = false;

		this.status = '';

		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onStarted = this.onStarted.bind(this);
		this.onTyping = this.onTyping.bind(this);
		this.onTyped = this.onTyped.bind(this);
		this.onEnded = this.onEnded.bind(this);
		this.onHover = this.onHover.bind(this);
		this.onClick = this.onClick.bind(this);
		this.Icon = this.Icon.bind(this);
		this.Clear = this.Clear.bind(this);
	}
	componentDidMount() {
		this.onStart();
	}
	componentWillUnmount() {
		this.Clear();
	}
	onTransitionEnd(e) {
		if (
			e.target.classList.contains('love-icon') &&
			e.propertyName === 'opacity'
		) {
			if (!this.state.show) this.onEnded();
		}
	}
	onStart() {
		this.Clear();
		this.status = 'start';

		let k;

		do {
			k = Math.floor(Math.random() * Data.length);
		} while (k === this.state.k);

		//

		this.setState(
			{
				showLink: false,
				k: k,
				type: Data[k].type,
				title: Data[k].title,
				titleTyping: '',
				link: Data[k].link,
			},
			this.onStarted
		);
	}
	onStarted() {
		this.Clear();
		this.status = 'started';

		this.timeoutStarted = setTimeout(() => {
			this.setState(
				{
					show: true,
				},
				() => {
					this.timeoutTyping = setTimeout(this.onTyping, 500);
				}
			);
		}, 100);
	}
	onTyping() {
		this.Clear();
		this.status = 'typing';

		let typed = [];

		this.intervalTyping = setInterval(() => {
			const wrong = typed.length > 0 && Math.random() * 10 < 3;
			const characters =
				'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let wrongCharacter = '';

			if (wrong) {
				do {
					wrongCharacter = characters.charAt(
						Math.floor(Math.random() * characters.length)
					);
				} while (wrongCharacter === this.state.title[typed.length]);

				typed.push(wrongCharacter);
			} else typed.push(this.state.title[typed.length]);

			//

			if (typed.length <= this.state.title.length) {
				this.setState(
					{
						titleTyping: typed.join(''),
					},
					() => {
						if (wrong) typed.pop();
					}
				);
			} else {
				this.Clear();
				this.onTyped(false);
			}
		}, 80);
	}
	onTyped(fromOver) {
		this.Clear();
		this.status = 'typed';

		if (!this.state.over) {
			this.timeoutTyped = setTimeout(
				() => {
					this.setState({
						show: false,
						titleTyping: '',
					});
				},
				!fromOver ? 3000 : 500
			);
		}
		this.timeoutLink = setTimeout(() => {
			this.setState({
				showLink: true,
			});
		}, 10);
	}
	onEnded() {
		this.Clear();
		this.status = 'ended';

		this.timeoutEnded = setTimeout(() => {
			this.onStart();
		}, 200);
	}
	onHover(over) {
		this.setState(
			{
				over: over,
			},
			() => {
				if (this.status === 'typed') {
					if (!this.state.over) this.onTyped(true);
					else this.Clear();
				}
			}
		);
	}
	onClick(e) {
		ReactGA.event({
			category: 'Love',
			action: 'click',
			label:
				this.props.Locale.com.I +
				' ' +
				this.props.Locale.com[
					this.state.type.toUpperCase()
				].toLowerCase() +
				' ' +
				this.state.title,
		});
	}
	Icon() {
		const props = {
			title: this.props.Locale.com[this.state.type.toUpperCase()],
			className: 'love-icon mx-2',
		};
		switch (this.state.type) {
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
	}
	Clear() {
		clearTimeout(this.timeoutStarted);
		clearTimeout(this.timeoutTyping);
		clearTimeout(this.timeoutTyped);
		clearTimeout(this.timeoutEnded);
		clearTimeout(this.timeoutLink);
		clearInterval(this.intervalTyping);
	}
	render() {
		return this.state.type &&
			this.props.Locale.com[this.state.type.toUpperCase()] ? (
			<div
				className={
					'love text-success fw-bold' +
					(this.state.show ? ' show' : '') +
					(this.props.className ? ' ' + this.props.className : '')
				}
				onMouseEnter={() => this.onHover(true)}
				onMouseLeave={() => this.onHover(false)}
				onTransitionEnd={this.onTransitionEnd}
				title={
					this.props.Locale.com.I +
					' ' +
					this.props.Locale.com[
						this.state.type.toUpperCase()
					].toLowerCase() +
					' ' +
					this.state.title
				}>
				{this.props.Locale.com.I}
				{this.Icon()}
				{this.state.titleTyping}
				<span className='love-cursor'>_</span>
				{this.state.link &&
				this.state.titleTyping.length === this.state.title.length ? (
					<a
						className={
							'love-link link-success link-underline-opacity-0' +
							(this.state.showLink ? ' show' : '')
						}
						href={this.state.link}
						target='_blank'
						rel='noreferrer'
						onClick={this.onClick}>
						<ArrowRightShort />
					</a>
				) : null}
			</div>
		) : null;
	}
}
export default Love;
*/
