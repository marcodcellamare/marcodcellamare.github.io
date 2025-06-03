import { createContext } from 'react';
import { ParallaxContextProps } from '!/types/parallax';

export const ParallaxContext = createContext<ParallaxContextProps | undefined>(
	undefined
);
