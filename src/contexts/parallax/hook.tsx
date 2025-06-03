import { useContext } from 'react';
import { ParallaxContext } from './context';

export const useParallax = () => {
	const context = useContext(ParallaxContext);

	if (!context) {
		throw new Error('useParallax must be used within a ParallaxProvider');
	}
	return context;
};
