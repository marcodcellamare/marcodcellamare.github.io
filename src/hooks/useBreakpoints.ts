import { useRef, useState } from 'react';
import { useResize } from '@/contexts/resize';

import { cssVariable } from '@/utils/misc';
import { remToPx } from '@/utils/math';

type BreakpointsType =
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl'
	| '6xl'
	| '7xl';

const useBreakpoints = () => {
	const [current, setCurrent] = useState<BreakpointsType | ''>('');

	const breakpoints = useRef<Record<BreakpointsType, number>>({
		xs: 0,
		sm: remToPx(parseFloat(cssVariable('--breakpoint-sm'))),
		md: remToPx(parseFloat(cssVariable('--breakpoint-md'))),
		lg: remToPx(parseFloat(cssVariable('--breakpoint-lg'))),
		xl: remToPx(parseFloat(cssVariable('--breakpoint-xl'))),
		'2xl': remToPx(parseFloat(cssVariable('--breakpoint-2xl'))),
		'3xl': remToPx(parseFloat(cssVariable('--breakpoint-3xl'))),
		'4xl': remToPx(parseFloat(cssVariable('--breakpoint-4xl'))),
		'5xl': remToPx(parseFloat(cssVariable('--breakpoint-5xl'))),
		'6xl': remToPx(parseFloat(cssVariable('--breakpoint-6xl'))),
		'7xl': remToPx(parseFloat(cssVariable('--breakpoint-7xl'))),
	});

	const { width } = useResize(() =>
		setCurrent(
			Object.entries(breakpoints.current)
				.reverse()
				.find(
					([_, breakpoint]) => width >= breakpoint
				)?.[0] as BreakpointsType
		)
	);
	return { breakpoints, currentBreakpoint: current };
};

export default useBreakpoints;
