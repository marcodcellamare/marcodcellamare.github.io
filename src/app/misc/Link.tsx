import { ReactNode, useEffect } from 'react';
import useScramble from '!/hooks/useScramble';
import { useFirebase } from '!/contexts/firebase';

interface LinkProps {
	children?: string | ReactNode;
}

const Link = ({ children }: LinkProps) => {
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
		// TODO link

		//openExternalLink(url);
		logEvent('inline_link', {
			//url,
		});
	};

	useEffect(() => setOriginalText(text), [setOriginalText, text]);

	return (
		<button
			type='button'
			role='button'
			className='btn btn-link text-[var(--color-link)] hover:text-[var(--color-link-hover)] active:text-[var(--color-link-active)] whitespace-nowrap relative'
			aria-label={displayText}
			onPointerEnter={start}
			onPointerLeave={stop}
			onClick={handleClick}>
			<span className='invisible'>{originalText}</span>
			<span className='absolute left-0 top-0'>{displayText}</span>
		</button>
	);
};
export default Link;
