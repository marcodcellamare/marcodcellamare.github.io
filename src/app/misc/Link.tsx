import { ReactNode, useEffect } from 'react';
import useScramble from '!/hooks/useScramble';
import { useFirebase } from '!/contexts/firebase';
import { openExternalLink } from '!/utils/misc';
import { useNavigate } from 'react-router-dom';

interface LinkProps {
	to?: string;
	children?: string | ReactNode;
}

const Link = ({ to, children }: LinkProps) => {
	const navigate = useNavigate();
	const { logEvent } = useFirebase();
	const { setOriginalText, originalText, displayText, start, stop } =
		useScramble();

	const text =
		typeof children === 'string'
			? children
			: Array.isArray(children)
			? children.join('')
			: '';

	const handleClick = () => {
		if (!to) return;

		if (to.toLowerCase().startsWith('http')) {
			openExternalLink(to);
		} else {
			navigate(to);
		}

		logEvent('inline_link', {
			url: to,
			external: to.toLowerCase().startsWith('http'),
		});
	};

	useEffect(() => setOriginalText(text), [setOriginalText, text]);

	if (!to) return originalText;

	return (
		<button
			type='button'
			role='button'
			className='btn btn-link text-(--color-link) hover:text-(--color-link-hover) active:text-(--color-link-active) whitespace-nowrap relative'
			aria-label={displayText}
			onPointerEnter={start}
			onPointerLeave={stop}
			onClick={handleClick}
			title={to}>
			<span className='invisible'>{originalText}</span>
			<span className='absolute left-0 top-0'>{displayText}</span>
		</button>
	);
};
export default Link;
