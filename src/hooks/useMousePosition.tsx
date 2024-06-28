import { useEffect, useState } from 'react';
import { Point as PointInterface } from '@interfaces/math';

const useMousePosition = (): PointInterface => {
	const [position, setPosition] = useState<PointInterface>({ x: 0, y: 0 });

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			setPosition({ x: e.pageX, y: e.pageY });
		};
		document.addEventListener('mousemove', onMouseMove);
		return () => document.removeEventListener('mousemove', onMouseMove);
	});
	return position;
};
export default useMousePosition;
