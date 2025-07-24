import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/contexts/router';
import { useSettings } from '@/contexts/settings';
import useScramble from '@/hooks/useScramble';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import config from '@config';

import { TimeoutType } from '@/types/misc';
import { PageIdType } from '@/types/config.const';

interface LinkProps {
	thisPageId: PageIdType;
}

const Link = ({ thisPageId }: LinkProps) => {
	const { t } = useTranslation();
	const { pageId } = useRouter();
	const { setOverPageId, setIsNavOpened, isNavOpened } = useSettings();
	const { setOriginalText, originalText, displayText, start, stop } =
		useScramble(100);

	const timeoutRef = useRef<TimeoutType>(null);
	const text = t(`nav.${thisPageId}`, thisPageId);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const handleClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			if (isNavOpened && pageId !== thisPageId) {
				cleanup();
				timeoutRef.current = setTimeout(
					() => setIsNavOpened(false),
					400
				);
			} else {
				e.preventDefault();
			}
		},
		[setIsNavOpened, isNavOpened, pageId, thisPageId]
	);

	useEffect(() => setOriginalText(text), [setOriginalText, text]);
	useEffect(() => {
		return cleanup;
	}, []);

	return (
		<NavLink
			to={config.pages.list[thisPageId]}
			onPointerEnter={() => {
				start();
				setOverPageId(thisPageId);
			}}
			onPointerLeave={() => {
				stop();
				setOverPageId(null);
			}}
			aria-label={originalText}
			onClick={handleClick}
			className={({ isActive }) =>
				classNames([
					'relative uppercase font-black inline-block transition-[color,font-size,line-height,padding-left,margin-left] duration-250 ease-in-out',
					!isActive
						? 'text-(--color-link) hover:text-(--color-link-hover) leading-[0.9em]'
						: 'text-(--color-link-active) text-[150%] leading-[0.8em]',
					{
						'cursor-pointer': !isActive,
						'!pointer-events-none': isActive || !isNavOpened,
						'-ms-[4%] lg:-ms-[3%]': isActive,
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
