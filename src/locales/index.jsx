import Config from '../config.json';

class Locale {
	constructor() {
		this.loaded = false;
		this.language = false;
		this.dev = process.env.NODE_ENV === 'development';

		this.Set = this.Set.bind(this);

		this.Set(Config.DEFAULT_LANGUAGE);
	}
	Set(language) {
		this.language = language;

		try {
			const Locale = require('./' + this.language + '/translations.json');

			Object.assign(this, Locale);
			this.loaded = true;
		} catch (e) {
			if (this.dev) console.error(e);

			this.Set(Config.DEFAULT_LANGUAGE);
		}
	}
}
export default Locale;
