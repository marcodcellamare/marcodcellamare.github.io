import { ReactNode, useEffect } from 'react';
import useScramble from '!/hooks/useScramble';

interface LinkProps {
	children?: string | ReactNode;
}

const Link = ({ children }: LinkProps) => {
	const { setOriginalText, originalText, displayText, start, stop } =
		useScramble();

	const text =
		typeof children === 'string'
			? children
			: Array.isArray(children)
			? children.join('')
			: '';

	useEffect(() => setOriginalText(text), [setOriginalText, text]);

	return (
		<button
			type='button'
			className='btn btn-link text-[var(--color-link)] hover:text-[var(--color-link-hover)] active:text-[var(--color-link-active)] whitespace-nowrap relative'
			onPointerEnter={start}
			onPointerLeave={stop}
			onClick={() => console.log('xxxxxx')}>
			<span className='invisible'>{originalText}</span>
			<span className='absolute left-0 top-0'>{displayText}</span>
		</button>
	);
};
export default Link;
