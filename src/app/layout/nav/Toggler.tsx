import { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/useUIStore';

interface TogglerProps {
	className?: string;
}

const Toggler = ({ className }: TogglerProps) => {
	const isNavOpened = useUIStore((state) => state.isNavOpened);
	const setIsNavOpened = useUIStore((state) => state.setIsNavOpened);
	const { t } = useTranslation();

	const [isOver, setIsOver] = useState(false);

	return (
		<button
			type='button'
			role='button'
			className={classNames([
				'nav-toggler block relative w-12 h-[calc((var(--spacing)*1.5*3)+(var(--spacing)*0.5*2))] cursor-pointer',
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
						'absolute top-1/2 left-1/2 -translate-x-1/2 bg-(--color-palette-gray)',
						'transition-[translate,rotate,width,height,background-color] duration-400 ease-in-out',
						{
							'delay-200': !isNavOpened && k === 0,
							'delay-400': !isNavOpened && k === 2,
						},
						!isOver ? 'h-2' : 'h-1.5',
						!isNavOpened
							? !isOver
								? {
										'w-full translate-y-[calc(-50%-(var(--spacing)*2)-(var(--spacing)*0.5))]':
											k === 0,
										'w-full -translate-y-1/2': k === 1,
										'w-full translate-y-[calc(-50%+(var(--spacing)*2)+(var(--spacing)*0.5))]':
											k === 2,
								  }
								: {
										'w-full translate-y-[calc(-50%-(var(--spacing)*1.5)-(var(--spacing)*0.5))]':
											k === 0,
										'w-4/5 -translate-y-1/2': k === 1,
										'w-full translate-y-[calc(-50%+(var(--spacing)*1.5)+(var(--spacing)*0.5))]':
											k === 2,
								  }
							: [
									'-translate-y-1/2',
									{
										'-rotate-45': k === 0,
										'w-4/5 !h-0': k === 1,
										'rotate-45': k === 2,
									},
									!isOver
										? {
												'w-full': k === 0 || k === 2,
										  }
										: {
												'w-3/2': k === 0 || k === 2,
										  },
							  ],
					])}
				/>
			))}
		</button>
	);
};
export default Toggler;
