import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useTranslationFallback = <T>(
	key: string,
	fallback: Partial<T> = {},
	ns?: string
): Partial<T> => {
	const { t } = useTranslation();

	return useMemo(() => {
		const raw = t(key, { returnObjects: true, ns: ns }) as unknown;

		return raw !== key ? (raw as Partial<T>) : fallback;
	}, [t, key, fallback, ns]);
};
export default useTranslationFallback;
