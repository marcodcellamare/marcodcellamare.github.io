import Config from '@config';

const resources = () => {
	let locale = {};

	Config.locale.allowed.forEach((iso) => {
		locale[iso] = {};

		Object.keys(Config.locale.ns).forEach((type) => {
			Config.locale.ns[type].forEach((namebase) => {
				locale[iso][namebase] = loader({
					iso: type === '%ISO%' ? iso : null,
					file: namebase,
				});
			});
		});
	});
	return locale;
};
const loader = ({ iso, file }: { iso?: string; file: string }): object => {
	let json = {};

	try {
		json = require(`.${iso ? '/' + iso : ''}/${file}.json`);
	} catch (error) {
		console.error(error);
	}
	return json;
};
export default resources;
