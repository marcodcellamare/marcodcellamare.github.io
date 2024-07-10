import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationInterface from '@interfaces/translation';
import Config from '@config';
import en from './en/translation.json';

const resources = {
	en: {
		translation: en as TranslationInterface,
	},
};
export const i18n = i18next
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)

	// Detect user language https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)

	// Init i18next https://www.i18next.com/overview/configuration-options
	.init({
		resources: resources,
		fallbackLng: Config.DEFAULT_LANGUAGE,
		supportedLngs: Config.LANGUAGES,
		returnEmptyString: true,
		debug:
			process.env.NODE_ENV !== 'production' &&
			process.env.NODE_ENV !== 'test',

		interpolation: {
			escapeValue: false,
		},
		// Returns an empty string when the translation is missing
		parseMissingKeyHandler: () => '',
	});
