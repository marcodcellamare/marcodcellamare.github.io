import { useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';

export interface BreakpointsProps {
	showBreakpoints?: boolean;
	subContainer?: boolean;
}

export const Breakpoints = ({
	showBreakpoints,
	subContainer,
}: BreakpointsProps) => {
	const [containerWidth, setContainerWidth] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);

	const { width } = useResize(() => {
		if (!showBreakpoints || !subContainer) return;

		const container = containerRef.current;
		if (!container) return;

		setContainerWidth(Math.round(container.getBoundingClientRect().width));
	});

	if (!showBreakpoints) return;

	return (
		<div
			ref={containerRef}
			className='absolute top-0 bottom-0 left-0 right-0 border-2 border-dashed border-white z-99999 mix-blend-difference pointer-events-none'>
			<div className='absolute top-0 right-0 -translate-y-1/2 bg-white text-black px-3 py-2 font-black'>
				{subContainer && (
					<div className='text-sm leading-[1.1em]'>
						<span className='@sm:hidden'>@xs</span>
						<span className='hidden @sm:@max-md:inline'>@sm</span>
						<span className='hidden @md:@max-lg:inline'>@md</span>
						<span className='hidden @lg:@max-xl:inline'>@lg</span>
						<span className='hidden @xl:@max-2xl:inline'>@xl</span>
						<span className='hidden @2xl:@max-3xl:inline'>
							@2xl
						</span>
						<span className='hidden @3xl:@max-4xl:inline'>
							@3xl
						</span>
						<span className='hidden @4xl:@max-5xl:inline'>
							@4xl
						</span>
						<span className='hidden @5xl:@max-6xl:inline'>
							@5xl
						</span>
						<span className='hidden @6xl:@max-7xl:inline'>
							@6xl
						</span>
						<span className='hidden @7xl:inline'>&raquo; @7xl</span>
						<span className='ms-1'>{`(${containerWidth}px)`}</span>
					</div>
				)}
				<div className='text-xs leading-[1.1em]'>
					<span className='sm:hidden'>—xs—</span>
					<span className='hidden sm:max-md:inline'>—sm—</span>
					<span className='hidden md:max-lg:inline'>—md—</span>
					<span className='hidden lg:max-xl:inline'>—lg—</span>
					<span className='hidden xl:max-2xl:inline'>—xl—</span>
					<span className='hidden 2xl:max-3xl:inline'>—2xl—</span>
					<span className='hidden 3xl:max-4xl:inline'>—3xl—</span>
					<span className='hidden 4xl:max-5xl:inline'>—4xl—</span>
					<span className='hidden 5xl:max-6xl:inline'>—5xl—</span>
					<span className='hidden 6xl:max-7xl:inline'>—6xl—</span>
					<span className='hidden 7xl:inline'>&raquo; —7xl—</span>
					<span className='ms-1'>{`(${width}px)`}</span>
				</div>
			</div>
		</div>
	);
};
