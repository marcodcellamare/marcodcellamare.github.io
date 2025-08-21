declare module '@georgedoescode/spline' {
	export function spline(
		points: Array<{ x: number; y: number }>,
		tension?: number,
		close?: boolean
	): string;
}
declare module '*.svg' {
	import * as React from 'react';
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
declare module '*.svg?react' {
	import * as React from 'react';
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}
declare module 'react-bootstrap-icons/dist/icons/*' {
	import * as React from 'react';
	const Icon: React.FC<React.SVGProps<SVGSVGElement>>;
	export default Icon;
}
