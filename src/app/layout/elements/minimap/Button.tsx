import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

interface ButtonProps {
	sectionId: number;
}

const Button = ({ sectionId }: ButtonProps) => {
	const activeSectionId = useUIStore((state) => state.activeSectionId);
	const { sectionRefs } = useUIStore();
	const pageId = useUIStore((state) => state.pageId);
	const { t } = useTranslation(pageId);

	const [isOver, setIsOver] = useState(false);

	const handleClick = () =>
		sectionRefs.current[sectionId]?.scrollIntoView({
			behavior: 'smooth',
		});

	return (
		<button
			type='button'
			role='button'
			className='minimap-section min-w-8 min-h-2 bg-(--color-palette-gray) flex flex-col items-end cursor-pointer'
			disabled={activeSectionId === sectionId}
			onPointerEnter={() => setIsOver(true)}
			onPointerLeave={() => setIsOver(false)}
			onClick={handleClick}
			aria-hidden={true}>
			<span
				className={classNames([
					'h6 block mr-3 text-xxs font-black uppercase text-nowrap text-end overflow-hidden text-(--color-palette-gray) mix-blend-difference',
					'transition-[max-width,padding] duration-800 ease-in-out',
					activeSectionId !== sectionId && !isOver
						? 'max-w-0 py-0 pl-0'
						: 'max-w-100 py-2 pl-3',
				])}>
				{t(`sections.${sectionId}.title`)}
			</span>
		</button>
	);
};
export default Button;
