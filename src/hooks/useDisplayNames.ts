import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import config from '@config';

const useDisplayNames = () => {
	const { i18n } = useTranslation();

	const init = useCallback(
		(type: Intl.DisplayNamesType) => {
			try {
				return new Intl.DisplayNames(i18n.language, {
					type,
				});
			} catch (error) {
				if (import.meta.env.DEV) console.error(error);
			}
			return new Intl.DisplayNames(config.locale.allowed.default, {
				type,
			});
		},
		[i18n.language]
	);

	const translate = useCallback(
		(iso: string, type: Intl.DisplayNamesType) => {
			try {
				return (iso && init(type).of(iso)) ?? null;
			} catch (error) {
				if (import.meta.env.DEV) console.error(error);
			}
			return null;
		},
		[init]
	);

	const isoToCountry = useCallback(
		(iso: string) => translate(iso, 'region'),
		[translate]
	);
	const isoToLanguage = useCallback(
		(iso: string) => translate(iso, 'language'),
		[translate]
	);

	return { isoToCountry, isoToLanguage };
};
export default useDisplayNames;
