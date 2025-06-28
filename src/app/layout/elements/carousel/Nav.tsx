import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useRouter } from '!/contexts/router';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface NavProps {
	itemRefs: RefObject<(HTMLDivElement | null)[]>;
	activeIdx: number;
	setActiveIdx: Dispatch<SetStateAction<number>>;
	totalSlides: number;
	className?: string;
}

const Nav = ({
	itemRefs,
	activeIdx,
	setActiveIdx,
	totalSlides,
	className = '',
}: NavProps) => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { spaceRef } = useSettings();

	const [isOver, setIsOver] = useState(false);

	const handlePrev = () =>
		setActiveIdx((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

	const handleNext = () =>
		setActiveIdx((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

	useEffect(
		() =>
			itemRefs.current[activeIdx]?.scrollIntoView({
				behavior: 'smooth',
			}),
		[itemRefs, activeIdx]
	);

	if (totalSlides < 2) return null;

	return (
		<div
			className={classNames([
				'absolute top-1/2 right-0 -translate-y-1/2 z-100',
				className,
			])}>
			<div
				className={classNames([
					'absolute top-1/2 right-0 -translate-y-1/2 h-[0.2rem] bg-[var(--color-link)]/35 pointer-events-none transform-[width] duration-300 ease-in-out',
					!isOver ? 'w-[100%]' : 'w-[150%]',
				])}
			/>
			<div
				className={classNames([
					'flex items-center gap-1.5 relative',
					spaceRef.current.absEdge,
				])}>
				<button
					type='button'
					role='button'
					aria-label={t('default:prev')}
					className='btn btn-link text-[var(--color-link)] hover:text-[var(--color-link-hover)] active:text-[var(--color-link-active)] !no-underline'
					onPointerEnter={() => setIsOver(true)}
					onPointerLeave={() => setIsOver(false)}
					onClick={handlePrev}>
					<ArrowLeftIcon className='text-svg-inline text-2xl' />
				</button>
				<div className='text-xxs font-bold text-[var(--color-link)]'>
					{activeIdx + 1} / {totalSlides}
				</div>
				<button
					type='button'
					role='button'
					aria-label={t('default:next')}
					className='btn btn-link text-[var(--color-link)] hover:text-[var(--color-link-hover)] active:text-[var(--color-link-active)] !no-underline'
					onPointerEnter={() => setIsOver(true)}
					onPointerLeave={() => setIsOver(false)}
					onClick={handleNext}>
					<ArrowRightIcon className='text-svg-inline text-7xl' />
				</button>
			</div>
		</div>
	);
};
export default Nav;
