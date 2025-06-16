declare module '@georgedoescode/spline' {
	export function spline(
		points: Array<{ x: number; y: number }>,
		tension?: number,
		close?: boolean
	): string;
}
