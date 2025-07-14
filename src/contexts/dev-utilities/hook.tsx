import { useContext } from 'react';
import { DevUtilitiesContext, DevUtilitiesContextProps } from './context';

export const useDevUtilities = (): DevUtilitiesContextProps => {
	const context = useContext(DevUtilitiesContext);

	if (!context) {
		throw new Error(
			'useDevUtilities must be used within a DevUtilitiesProvider'
		);
	}
	return context;
};
