import { useContext } from 'react';
import { FirebaseContext, FirebaseContextProps } from './context';

export const useFirebase = (): FirebaseContextProps => {
	const context = useContext(FirebaseContext);

	if (!context) {
		throw new Error('useFirebase must be used within a FirebaseProvider');
	}
	return context;
};
