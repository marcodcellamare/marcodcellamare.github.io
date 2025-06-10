export const pxToRem = (pixel: number): number => pixel / 16;
export const remToPx = (rem: number): number => rem * 16;

export const random = ({ min, max }: { min: number; max: number }): number =>
	Math.random() * (max - min) + min;
