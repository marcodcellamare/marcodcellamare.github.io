const XML = require('xml-js');
const Config = require('./assets/config.json');

class Map {
	constructor() {
		this.fs = require('fs');
		this.path = require('path');
		this.root = this.path.join(__dirname, '../');
		this.build = this.path.join(this.root, 'build');

		this.date = new Date();
		this.languages = {};
		this.sitemap = false;

		this.Init = this.Init.bind(this);
		this.Languages = this.Languages.bind(this);
		this.Generate = this.Generate.bind(this);
		this.Save = this.Save.bind(this);

		this.Init();
	}
	Init() {
		this.Languages();
		this.Generate();
		this.Save();
	}
	Languages() {
		Object.keys(Config.LANGUAGES).forEach(iso => {
			if (Config.LANGUAGES[iso].state)
				this.languages[iso] = iso.substring(0, 2);
		});
	}
	Generate() {
		this.sitemap = {
			_declaration: {
				_attributes: {
					version: '1.0',
					encoding: 'UTF-8'
				}
			},
			urlset: {
				_attributes: {
					xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
					'xmlns:xhtml': 'http://www.w3.org/1999/xhtml'
				},
				url: []
			}
		};
		Config.NAV.forEach(path => {
			let url = {
				loc: Config.DOMAIN + '/#' + path,
				lastmod: this.date.toISOString().split('T')[0],
				priority: 0.8
			};

			if (Object.keys(this.languages).length > 1) {
				url['xhtml:link'] = [];

				Object.keys(this.languages).forEach((iso, k) => {
					url['xhtml:link'].push({
						_attributes: {
							rel: 'alternate',
							hreflang: this.languages[iso],
							href: Config.DOMAIN + '/#/' + this.languages[iso] + path,
						}
					});
				});
			}
			this.sitemap.urlset.url.push(url);
		});
	}
	Save() {
		this.fs.writeFile(this.path.join(this.build, 'sitemap.xml'),
			XML.json2xml(this.sitemap, { compact: true }),
			err => {
				if (err) {
					console.error(err);
					return;
				}
				console.log('Sitemap created.', this.path.join(this.build, 'sitemap.xml'));
			});
	}
}
new Map();