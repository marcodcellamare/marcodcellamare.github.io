import { FC, lazy, LazyExoticComponent, Suspense, SVGProps } from 'react';

export type BrandIconComponent = FC<SVGProps<SVGSVGElement>>;

interface IconProps {
	name: string;
	className?: string;
}

const iconCache = new Map<string, LazyExoticComponent<BrandIconComponent>>();

const getIconComponent = (name: string) => {
	if (!iconCache.has(name)) {
		const Component = lazy(
			() =>
				import(`@/assets/brands/${name}.svg?react`) as Promise<{
					default: BrandIconComponent;
				}>
		);
		iconCache.set(name, Component);
	}
	return iconCache.get(name)!;
};

const Icon = ({ name, className }: IconProps) => {
	const SvgIcon = getIconComponent(name);

	return (
		<Suspense fallback={null}>
			<SvgIcon className={className} />
		</Suspense>
	);
};
export default Icon;
