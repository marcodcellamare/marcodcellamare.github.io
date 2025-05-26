export const cssVariable = (variableName: string) => {
	const root = getComputedStyle(document.documentElement);
	return root.getPropertyValue(variableName).trim();
};

export const windowSize = {
	width: () => window.innerWidth,
	height: () => window.innerHeight,
};

export const openExternalLink = (link: string) =>
	window.open(link, '_blank', 'noopener, noreferrer');
