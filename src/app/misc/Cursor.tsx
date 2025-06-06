import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping: 50, stiffness: 1000 };
	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);

	const [isHoveringLink, setIsHoveringLink] = useState(false);

	useEffect(() => {
		const links = document.querySelectorAll('a, button');

		const moveHandler = (e: MouseEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		const mouseEnterHandler = () => setIsHoveringLink(true);
		const mouseLeaveHandler = () => setIsHoveringLink(false);

		window.addEventListener('mousemove', moveHandler);

		links.forEach((link) => {
			link.addEventListener('mouseenter', mouseEnterHandler);
			link.addEventListener('mouseleave', mouseLeaveHandler);
		});

		return () => {
			window.removeEventListener('mousemove', moveHandler);

			links.forEach((link) => {
				link.removeEventListener('mouseenter', mouseEnterHandler);
				link.removeEventListener('mouseleave', mouseLeaveHandler);
			});
		};
	}, [x, y]);

	return (
		<motion.div
			className='fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference'
			style={{
				translateX: springX,
				translateY: springY,
			}}>
			<motion.div
				className='w-10 h-10 -translate-1/2 aspect-square bg-base-200 rounded-full'
				animate={{
					scale: isHoveringLink ? 8 : 1,
				}}

				//transition={{ type: 'inertia', stiffness: 200, damping: 30 }}
			/>
		</motion.div>
	);
};

export default Cursor;
