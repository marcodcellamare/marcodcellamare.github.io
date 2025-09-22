export const cssVariable = (
	variableName: string,
	selector?: string | HTMLElement
): string => {
	if (typeof document === 'undefined') return '';

	if (typeof selector === 'string') {
		const selected = document.querySelector<HTMLElement>(selector);
		selector = selected ?? undefined;
	}
	const element = selector ?? document.documentElement;
	const styles = getComputedStyle(element);
	return styles.getPropertyValue(variableName).trim();
};

export const windowSize = {
	width: () => window.innerWidth,
	height: () => window.innerHeight,
};

export const openExternalLink = (link: string) =>
	window.open(link, '_blank', 'noopener, noreferrer');
