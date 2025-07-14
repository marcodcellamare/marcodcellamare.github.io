import { ReactNode, useEffect, useState } from 'react';
import { DevUtilitiesContext } from './context';
import { Breakpoints } from './Breakpoints';

interface DevUtilitiesProviderProps {
	children: ReactNode;
}

export const DevUtilitiesProvider = ({
	children,
}: DevUtilitiesProviderProps) => {
	const [showBreakpoints, setShowBreakpoints] = useState(false);

	useEffect(() => {
		if (import.meta.env.PROD) return;

		const handleKeydown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'b':
					setShowBreakpoints((prev) => !prev);
			}
		};
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, []);

	return (
		<DevUtilitiesContext.Provider
			value={{
				DevBreakpoints: (props) => (
					<Breakpoints
						{...props}
						showBreakpoints={showBreakpoints}
					/>
				),
			}}>
			{children}
		</DevUtilitiesContext.Provider>
	);
};
