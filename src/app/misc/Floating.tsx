import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

type FloatMode = 'attract' | 'repel';

interface FloatingProps {
	mode?: FloatMode;
	strength?: number; // control how strongly it moves
	children: React.ReactNode;
}

const Floating = ({
	mode = 'attract',
	strength = 50,
	children,
}: FloatingProps) => {
	// TODO test it

	const controls = useAnimation();
	const [mouse, setMouse] = useState({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});
	const ref = React.useRef<HTMLDivElement>(null);

	// Track mouse globally
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMouse({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	// Calculate floating effect
	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const rect = element.getBoundingClientRect();
		const elemX = rect.left + rect.width / 2;
		const elemY = rect.top + rect.height / 2;

		const dx = mouse.x - elemX;
		const dy = mouse.y - elemY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		// Normalize the vector
		const nx = dx / distance;
		const ny = dy / distance;

		// Determine movement based on mode
		const moveX = mode === 'attract' ? nx * strength : -nx * strength;
		const moveY = mode === 'attract' ? ny * strength : -ny * strength;

		controls.start({
			x: moveX,
			y: moveY,
			transition: { type: 'spring', stiffness: 100, damping: 15 },
		});
	}, [mouse, mode, strength, controls]);

	return (
		<motion.div
			ref={ref}
			animate={controls}
			style={{ display: 'inline-block' }}>
			{children}
		</motion.div>
	);
};

export default Floating;
