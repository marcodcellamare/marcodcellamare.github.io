import { useState } from 'react';
import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface TogglerProps {
	className?: string;
}

const Toggler = ({ className }: TogglerProps) => {
	const { t } = useTranslation();
	const { isNavOpened, setIsNavOpened } = useSettings();

	const [isOver, setIsOver] = useState(false);

	return (
		<button
			type='button'
			role='button'
			className={classNames([
				'toggler relative w-[3.5rem] md:w-[3rem] aspect-square cursor-pointer',
				className,
				{
					active: isNavOpened,
				},
			])}
			aria-label={t('menu')}
			aria-pressed={isNavOpened}
			onPointerEnter={() => setIsOver(true)}
			onPointerLeave={() => setIsOver(false)}
			onClick={() => setIsNavOpened(!isNavOpened)}>
			{Array.from({ length: 3 }).map((_, k) => (
				<div
					key={k}
					className={classNames([
						'absolute left-0 right-0 -translate-y-1/2 origin-center bg-(--color-palette-gray)',
						'transition-[top,translate,rotate,height,background-color] duration-400 ease-in-out',
						{
							'delay-[200ms]': k === 0,
							'delay-[300ms]': k === 2,
						},
						!isNavOpened
							? [
									'h-1/7',
									!isOver
										? {
												'top-1/4': k === 0,
												'top-2/4': k === 1,
												'top-3/4': k === 2,
										  }
										: {
												'top-3/10': k === 0,
												'top-5/10': k === 1,
												'top-7/10': k === 2,
										  },
							  ]
							: [
									'top-1/2',
									{
										'h-0': k === 1,
										'-rotate-45': k === 0,
										'rotate-45': k === 2,
									},
									!isOver
										? {
												'h-1/7': k === 0 || k === 2,
										  }
										: {
												'h-1/5': k === 0 || k === 2,
										  },
							  ],
					])}
				/>
			))}
		</button>
	);
};
export default Toggler;
