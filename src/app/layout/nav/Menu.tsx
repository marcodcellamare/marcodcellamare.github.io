import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '!/contexts/router';
import { useSettings } from '!/contexts/settings';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import config from '!config';

import { TimeoutType } from '!/types/misc';
import { PageIdType } from '!/types/config.const';

const Menu = () => {
	const { t } = useTranslation();
	const { pageId } = useRouter();
	const { setOverPageId, setIsNavOpened, isNavOpened } = useSettings();

	const timeoutRef = useRef<TimeoutType>(null);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const clickHandler = useCallback(
		(e: MouseEvent<HTMLAnchorElement>, thisPageId: PageIdType) => {
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
		[setIsNavOpened, isNavOpened, pageId]
	);

	useEffect(() => cleanup, []);

	return (
		<ul className='relative my-auto flex flex-col justify-center h1'>
			{(Object.keys(config.pages.list) as PageIdType[]).map((pageId) =>
				!config.pages.list[pageId].startsWith(config.pages.hide) ? (
					<li key={pageId}>
						<NavLink
							to={config.pages.list[pageId]}
							onPointerEnter={() => setOverPageId(pageId)}
							onPointerLeave={() => setOverPageId(null)}
							onClick={(e) => clickHandler(e, pageId)}
							className={({ isActive }) =>
								classNames([
									'relative uppercase font-black transition-[color,font-size,line-height,padding-left,margin-left] inline-block duration-250 ease-in-out',
									!isActive
										? 'text-[var(--color-link)] hover:text-[var(--color-link-hover)] leading-[0.9em]'
										: 'text-[var(--color-link-active)] text-[150%] leading-[0.8em]',
									{
										'cursor-pointer hover:pl-5': !isActive,
										'!pointer-events-none':
											isActive || !isNavOpened,
										'-ms-[4%] lg:-ms-[3%]': isActive,
									},
								])
							}>
							{t(`nav.${pageId}`, pageId)}
						</NavLink>
					</li>
				) : null
			)}
		</ul>
	);
};
export default Menu;
