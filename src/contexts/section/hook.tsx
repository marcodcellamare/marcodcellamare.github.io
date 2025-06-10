import { useContext } from 'react';
import { SectionContext, SectionContextProps } from './context';

export const useSection = (): SectionContextProps => {
	const context = useContext(SectionContext);

	if (!context) {
		throw new Error('useSection must be used within a SectionProvider');
	}
	return context;
};
