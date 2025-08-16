import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScramble from '@/hooks/useScramble';
import { useUIStore } from '@/stores/useUIStore';
import { NavLink } from 'react-router';
import classNames from 'classnames';

import config from '@config';

import { TimeoutType } from '@/types/misc';
import { PageIdType } from '@/types/config.const';

interface LinkProps {
	id: PageIdType;
}

const Link = ({ id }: LinkProps) => {
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const setIsNavOpened = useUIStore((state) => state.setIsNavOpened);
	const setOverPageId = useUIStore((state) => state.setOverPageId);
	const pageId = useUIStore((state) => state.pageId);

	const { t } = useTranslation();
	const { setOriginalText, originalText, displayText, start, stop } =
		useScramble(100);

	const timeoutRef = useRef<TimeoutType>(null);
	const text = t(`nav.${id}`, id);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const handleClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			if (isNavOpened && pageId !== id) {
				cleanup();
				timeoutRef.current = setTimeout(
					() => setIsNavOpened(false),
					400
				);
			} else {
				e.preventDefault();
			}
		},
		[setIsNavOpened, isNavOpened, pageId, id]
	);

	useEffect(() => setOriginalText(text), [setOriginalText, text]);
	useEffect(() => {
		return cleanup;
	}, []);

	return (
		<NavLink
			to={config.pages.list[id]}
			onPointerEnter={() => {
				start();
				setOverPageId(id);
			}}
			onPointerLeave={() => {
				stop();
				setOverPageId(null);
			}}
			aria-label={originalText}
			onClick={handleClick}
			className={({ isActive }) =>
				classNames([
					'nav-link relative uppercase font-black inline-block transition-[color,font-size,line-height,padding-left,margin-left] duration-250 ease-in-out',
					!isActive
						? 'text-(--color-theme-link) hover:text-(--color-theme-link-hover) leading-[0.9em]'
						: 'text-(--color-theme-link-active) text-[120%] lg:text-[150%] leading-[0.8em]',
					{
						'cursor-pointer': !isActive,
						'!pointer-events-none': isActive || !isNavOpened,
						'md:-translate-x-5 lg:-translate-x-10': isActive,
					},
				])
			}>
			{({ isActive }) => (
				<span aria-current={isActive ? 'page' : undefined}>
					<span className='invisible'>{originalText}</span>
					<span className='absolute left-0 top-0'>{displayText}</span>
				</span>
			)}
		</NavLink>
	);
};
export default Link;
