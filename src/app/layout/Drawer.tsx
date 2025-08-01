import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

import MountTransition from '@/app/misc/MountTransition';
import Content from '@/app/layout/elements/content';
import { MoveRightIcon } from 'lucide-react';

import '@/styles/components/elements/Drawer.css';

const Drawer = () => {
	const spacing = useUIStore((state) => state.spacing);
	const isDrawerOpened = useUIStore((state) => state.isDrawerOpened);
	const setIsDrawerOpened = useUIStore((state) => state.setIsDrawerOpened);
	const drawerRootKey = useUIStore((state) => state.drawerRootKey);
	const drawerTheme = useUIStore((state) => state.drawerTheme);

	return (
		<MountTransition
			mountIf={isDrawerOpened}
			timeout={500}>
			{({ isEntering }) => (
				<div
					data-theme={drawerTheme}
					className={classNames([
						'drawer absolute top-0 bottom-0 left-0 right-0',
						{
							'pointer-events-none': !isDrawerOpened,
						},
					])}>
					<button
						type='button'
						className={classNames([
							'drawer-overlay no-cursor-change absolute top-0 bottom-0 left-0 right-0',
							'bg-(--color-theme-background-contrast)/50 backdrop-blur-sm cursor-pointer',
							'transition-[opacity] duration-500 ease-in-out',
							{
								'opacity-0': !isEntering,
							},
						])}
						onClick={() => setIsDrawerOpened(false)}
					/>
					<div
						className={classNames([
							'drawer-content absolute top-0 bottom-0 right-0',
							'w-full sm:w-150 xl:w-200',
							'bg-(--color-theme-background)/50 text-(--color-theme-content)',
							'transition-[translate] duration-500 ease-in-out',
							!isEntering ? 'translate-x-full' : 'translate-x-0',
						])}>
						<div
							className={classNames([
								'absolute top-0 bottom-0 left-0 right-0',
								'overflow-x-hidden overflow-y-auto no-scrollbar',
								spacing.drawer,
							])}>
							<Content rootKey={drawerRootKey} />
						</div>
						<button
							type='button'
							className={classNames([
								'absolute top-0 right-0 text-(--color-theme-link) text-7xl lg:text-6xl group',
								spacing.absEdge,
							])}
							onClick={() => setIsDrawerOpened(false)}>
							<MoveRightIcon className='text-svg stroke-1 group-hover:scale-150 origin-right' />
						</button>
					</div>
				</div>
			)}
		</MountTransition>
	);
};
export default Drawer;
