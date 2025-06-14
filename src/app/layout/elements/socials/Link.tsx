import { useEffect, useMemo, useState } from 'react';
import useScramble from '!/hooks/useScramble';
import { openExternalLink } from '!/utils/misc';
import classNames from 'classnames';

import Icon from './Icon';

import { SocialInterface } from '.';

const Link = ({ type, title, link }: SocialInterface) => {
	const { setOriginalText, displayText, start, stop } = useScramble();

	const [isOver, setIsOver] = useState(false);

	const generate = useMemo(() => {
		switch (type) {
			case 'phone':
				return `tel:${link}`;

			case 'email':
				return `mailto:${link}`;

			default:
				return `https://${link}`;
		}
	}, [type, link]);

	useEffect(() => setOriginalText(title), [setOriginalText, title]);

	return (
		<button
			type='button'
			className='btn btn-link text-[var(--color-link)] hover:text-[var(--color-link-hover)] active:text-[var(--color-link-active)] !no-underline relative'
			title={title}
			onPointerEnter={() => {
				start();
				setIsOver(true);
			}}
			onPointerLeave={() => {
				stop();
				setIsOver(false);
			}}
			onClick={() => openExternalLink(generate)}>
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
