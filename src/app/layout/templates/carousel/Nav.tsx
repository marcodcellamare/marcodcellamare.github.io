import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRouter } from '@/contexts/router';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import { useScroll } from '@/contexts/scroll';
import useThrottleCallback from '@/hooks/useThrottleCallback';
import classNames from 'classnames';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Indicators from './Indicators';

interface NavProps {
	containerRef: RefObject<HTMLDivElement | null>;
	itemRefs: RefObject<(HTMLDivElement | null)[]>;
	activeIdx: number;
	setActiveIdx: Dispatch<SetStateAction<number>>;
	totalSlides: number;
	className?: string;
}

const Nav = ({
	containerRef,
	itemRefs,
	activeIdx,
	setActiveIdx,
	totalSlides,
	className,
}: NavProps) => {
	const spacing = useUIStore((state) => state.spacing);
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { isWheeling } = useScroll();

	const [isOver, setIsOver] = useState(false);

	const isWheelScroll = useRef(false);

	const handlePrev = () => {
		isWheelScroll.current = false;
		setActiveIdx((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
	};

	const handleNext = () => {
		isWheelScroll.current = false;
		setActiveIdx((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
	};

	const handleWheel = () => {
		const container = containerRef.current;
		if (!container) return;

		isWheelScroll.current = true;

		let closestIdx = 0;
		let closestDistance = Infinity;

		itemRefs.current.forEach((item, index) => {
			if (item) {
				const itemLeft = item.offsetLeft;
				const distance = Math.abs(container.scrollLeft - itemLeft);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIdx = index;
				}
			}
		});
		setActiveIdx(closestIdx);
	};

	const handleWheelThrottled = useThrottleCallback(handleWheel, 200);

	useEffect(handleWheelThrottled, [isWheeling, handleWheelThrottled]);

	useEffect(() => {
		if (isWheelScroll.current) return;

		const container = containerRef.current;
		const item = itemRefs.current[activeIdx];

		if (container && item) {
			const containerStyles = getComputedStyle(container);
			const scrollPaddingLeft =
				parseFloat(containerStyles.scrollPaddingLeft) || 0;

			container.scroll({
				left: item.offsetLeft - scrollPaddingLeft,
				behavior: 'smooth',
			});
		}
	}, [activeIdx, containerRef, itemRefs]);

	if (totalSlides < 2) return null;

	return (
		<div
			className={classNames([
				'absolute top-1/2 right-2 -translate-y-1/2 z-100',
				className,
			])}>
			<div
				className={classNames([
					'absolute top-1/2 right-0 -translate-y-1/2 h-[0.2rem] bg-(--color-link)/35 pointer-events-none transform-[width] duration-300 ease-in-out hidden md:block',
					!isOver ? 'w-[100%]' : 'w-[120%]',
				])}
			/>
			<div
				className={classNames([
					'flex items-center gap-1.5 relative',
					spacing.absEdge,
				])}>
				{totalSlides > 2 && (
					<button
						type='button'
						role='button'
						aria-label={t('default:prev')}
						className='btn btn-link text-(--color-link) hover:text-(--color-link-hover) active:text-(--color-link-active) !no-underline hidden lg:block'
						onPointerEnter={() => setIsOver(true)}
						onPointerLeave={() => setIsOver(false)}
						onClick={handlePrev}>
						<ArrowLeftIcon className='text-svg text-2xl' />
					</button>
				)}
				<div className='text-xxs font-bold text-(--color-link) hidden md:block'>
					{activeIdx + 1} / {totalSlides}
				</div>
				<button
					type='button'
					role='button'
					aria-label={t('default:next')}
					className='btn btn-link text-(--color-link) hover:text-(--color-link-hover) active:text-(--color-link-active) !no-underline'
					onPointerEnter={() => setIsOver(true)}
					onPointerLeave={() => setIsOver(false)}
					onClick={handleNext}>
					<ArrowRightIcon className='text-svg text-7xl' />
				</button>
				<Indicators
					activeIdx={activeIdx}
					totalSlides={totalSlides}
				/>
			</div>
		</div>
	);
};
export default Nav;
