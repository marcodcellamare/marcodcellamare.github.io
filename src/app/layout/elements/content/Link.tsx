import { ReactNode, useEffect } from 'react';
import useScramble from '@/hooks/useScramble';
import { useFirebase } from '@/contexts/firebase';
import { openExternalLink } from '@/utils/misc';
import { useNavigate } from 'react-router-dom';
import { useSection } from '@/contexts/section';
import { useUIStore } from '@/stores/useUIStore';

interface LinkProps {
	to?: number | string;
	children?: string | ReactNode;
}

const Link = ({ to, children }: LinkProps) => {
	const setIsDrawerOpened = useUIStore((state) => state.setIsDrawerOpened);
	const setDrawerRootKey = useUIStore((state) => state.setDrawerRootKey);
	const setDrawerTheme = useUIStore((state) => state.setDrawerTheme);
	const { sectionId, theme } = useSection();
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
		if (typeof to === 'undefined') return;

		if (typeof to === 'number') {
			setIsDrawerOpened(true);
			setDrawerRootKey(`sections.${sectionId}.drawer.${to}`);
			setDrawerTheme(theme);
		} else {
			if (to.toLowerCase().startsWith('http')) {
				openExternalLink(to);
			} else {
				navigate(to);
			}
		}

		logEvent('inline_link', {
			url: to,
			external:
				typeof to === 'string' && to.toLowerCase().startsWith('http'),
		});
	};

	useEffect(() => setOriginalText(text), [setOriginalText, text]);

	if (typeof to === 'undefined') return originalText;

	return (
		<button
			type='button'
			role='button'
			className='btn btn-link font-mono text-(--color-theme-link) hover:text-(--color-theme-link-hover) active:text-(--color-theme-link-active) whitespace-nowrap relative transition-[color] duration-500'
			aria-label={displayText}
			onPointerEnter={start}
			onPointerLeave={stop}
			onClick={handleClick}
			title={typeof to === 'string' ? to : ''}>
			<span className='invisible'>{originalText}</span>
			<span className='absolute left-0 top-0 underline'>
				{displayText}
			</span>
		</button>
	);
};
export default Link;
