import { useEffect } from 'react';

interface usePageVisibilityProps {
	onBlur?: () => void;
	onFocus?: () => void;
}

const usePageVisibility = ({
	onBlur = () => {},
	onFocus = () => {},
}: usePageVisibilityProps) =>
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				onBlur();
			} else {
				onFocus();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
		};
	}, [onBlur, onFocus]);

export default usePageVisibility;
