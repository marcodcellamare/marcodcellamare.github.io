import { useState } from 'react';
import { useRouter } from '!/contexts/router';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
	sectionId: number;
}

const Button = ({ sectionId }: ButtonProps) => {
	const { pageId } = useRouter();
	const { t } = useTranslation(pageId);
	const { sectionRefs, activeSectionId } = useSettings();

	const [isOver, setIsOver] = useState(false);

	const handleClick = () =>
		sectionRefs.current[sectionId]?.scrollIntoView({
			behavior: 'smooth',
		});

	return (
		<button
			type='button'
			role='button'
			className={classNames([
				'pr-5 mb-0.5 bg-[var(--color-palette-gray)] transition-[min-width,height,padding-left] duration-500 delay-100 ease-in-out flex flex-col justify-center items-end overflow-hidden mix-blend-difference',
				activeSectionId !== sectionId && !isOver
					? 'min-w-[1rem] h-5 pl-0'
					: 'h-10 pl-5',
			])}
			disabled={activeSectionId === sectionId}
			onPointerEnter={() => setIsOver(true)}
			onPointerLeave={() => setIsOver(false)}
			onClick={handleClick}>
			<div
				className={classNames([
					'text-xxs font-black font-title uppercase text-nowrap text-end transition-[max-width] duration-600 ease-in-out overflow-hidden text-[var(--color-palette-gray)] mix-blend-difference',
					activeSectionId !== sectionId && !isOver
						? 'max-w-0'
						: 'max-w-100 delay-400',
				])}>
				{t(`sections.${sectionId}.title`)}
			</div>
		</button>
	);
};
export default Button;
