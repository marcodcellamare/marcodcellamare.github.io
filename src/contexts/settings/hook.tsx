import { useContext } from 'react';
import { SettingsContext, SettingsContextProps } from './context';

export const useSettings = (): SettingsContextProps => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error('useSettings must be used within a SectionProvider');
	}
	return context;
};
