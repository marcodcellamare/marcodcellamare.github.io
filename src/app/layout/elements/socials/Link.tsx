import { useEffect, useMemo, useState } from 'react';
import useScramble from '!/hooks/useScramble';
import { useFirebase } from '!/contexts/firebase';
import { openExternalLink } from '!/utils/misc';
import classNames from 'classnames';

import Icon from './Icon';

import { SocialInterface } from '.';

const Link = ({ type, highlight, title, link }: SocialInterface) => {
	const { logEvent } = useFirebase();
	const { setOriginalText, displayText, start, stop } = useScramble();

	const [isOver, setIsOver] = useState(false);

	const generate = useMemo(() => {
		if (!link) return '';

		switch (type) {
			case 'phone':
				return `tel:${link}`;

			case 'email':
				return `mailto:${link}`;

			default:
				return `https://${link}`;
		}
	}, [type, link]);

	const handleClick = () => {
		const url = generate;
		if (!url) return;

		openExternalLink(url);
		logEvent('social_link', {
			type,
			title,
			url,
		});
	};

	useEffect(() => setOriginalText(title), [setOriginalText, title]);

	return (
		<button
			type='button'
			role='button'
			className={classNames([
				'btn btn-link disabled:text-(--color-heading) !no-underline relative',
				!highlight
					? 'text-(--color-link) hover:text-(--color-link-hover) active:text-(--color-link-active)'
					: 'text-(--color-link-hover) hover:text-(--color-link) active:text-(--color-link-active)',
			])}
			aria-label={title}
			title={title}
			onPointerEnter={() => {
				start();
				setIsOver(true);
			}}
			onPointerLeave={() => {
				stop();
				setIsOver(false);
			}}
			disabled={!link}
			onClick={handleClick}>
			<Icon
				type={type}
				title={title}
				className={classNames([
					'transition-[scale] duration-200 ease-in-out',
					{
						'scale-120': isOver,
					},
				])}
			/>
			<span className='hidden md:block text-xs absolute left-1/2 bottom-full -rotate-90 origin-left whitespace-nowrap pointer-events-none'>
				{displayText}
			</span>
		</button>
	);
};
export default Link;
