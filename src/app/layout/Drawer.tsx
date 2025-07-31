import { useUIStore } from '@/stores/useUIStore';
import classNames from 'classnames';

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
		<div
			data-theme={drawerTheme}
			className={classNames([
				'drawer fixed top-0 bottom-0 left-0 right-0',
				{
					'pointer-events-none': !isDrawerOpened,
				},
			])}>
			<div
				className={classNames([
					'drawer-overlay absolute top-0 bottom-0 left-0 right-0',
					'bg-(--color-theme-background-contrast)/50 backdrop-blur-sm cursor-pointer',
					'transition-[opacity] duration-500 ease-in-out',
					{
						'opacity-0': !isDrawerOpened,
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
					!isDrawerOpened ? 'translate-x-full' : 'translate-x-0',
				])}>
				<div
					className={classNames([
						'absolute top-0 bottom-0 left-0 right-0',
						'overflow-x-hidden overflow-y-auto',
						spacing.drawer,
					])}>
					<Content rootKey={drawerRootKey} />
				</div>
				<button
					className={classNames([
						'absolute top-0 right-0 text-(--color-theme-link) text-7xl lg:text-6xl group',
						spacing.absEdge,
					])}
					onClick={() => setIsDrawerOpened(false)}>
					<MoveRightIcon className='text-svg stroke-1 group-hover:scale-150 origin-right' />
				</button>
			</div>
		</div>
	);
};
export default Drawer;
