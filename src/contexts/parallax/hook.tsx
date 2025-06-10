import { useContext } from 'react';
import { ParallaxContext, ParallaxContextProps } from './context';

export const useParallax = (): ParallaxContextProps => {
	const context = useContext(ParallaxContext);

	if (!context) {
		throw new Error('useParallax must be used within a ParallaxProvider');
	}
	return context;
};
