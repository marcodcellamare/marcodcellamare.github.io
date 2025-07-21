/* interface ItfRoutesTree {
	path: string;
	current?: string;
	parent?: string;
	children?: ItfRoutesTree[];
	hidden?: boolean;
	deep?: number;
}
class Sitemap {
	fs: any;
	path: any;
	root: string;
	build: string;
	XML: any;
	Config: any;
	date: Date;
	languages: {
		[key: string]: string;
	};
	sitemap: any;

	constructor() {
		this.fs = require('fs');
		this.path = require('path');
		this.root = this.path.join(__dirname, '../../');
		this.build = this.path.join(this.root, 'build');
		this.XML = require('xml-js');
		this.Config = require('../config.json');
		this.date = new Date();
		this.sitemap = {};

		this.Init = this.Init.bind(this);
		this.Generate = this.Generate.bind(this);
		this.Tree = this.Tree.bind(this);
		this.Paths = this.Paths.bind(this);
		this.Combine = this.Combine.bind(this);
		this.Url = this.Url.bind(this);
		this.Save = this.Save.bind(this);

		this.Init();
	}
	Init() {
		this.Generate();
		this.Save();
	}
	Generate() {
		this.sitemap = {
			_declaration: {
				_attributes: {
					version: '1.0',
					encoding: 'UTF-8',
				},
			},
			urlset: {
				_attributes: {
					xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
					'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
				},
				url: [],
			},
		};
		const routes = this.Tree(this.Paths([this.Config.nav])).map(
			(routes: ItfRoutesTree[]) => routes
		);
		routes.map(({ path }: { path: string }) => this.Url(path));
	}
	Tree(routes: ItfRoutesTree[]) {
		let flatRoutes = routes
			.map((route) => {
				let newRoute = [
					{ ...route },
					route.children ? this.Tree(route.children) : [],
				];
				return newRoute;
			})
			.flat(Infinity);

		// Calculating the deep level

		flatRoutes.forEach((flatRoute: ItfRoutesTree) => {
			const parent = flatRoutes.find(
				({ path }) => path === flatRoute.parent
			);
			flatRoute.deep = parent ? parent.deep + 1 : 0;
		});
		return flatRoutes;
	}
	Paths(nav: ItfRoutesTree[], parentPath: string = '') {
		return nav.map((route) => {
			const path = this.Combine(parentPath, route.path);

			return {
				...route,
				path: path,
				current: route.path,
				parent: parentPath,
				...(route.children && {
					children: this.Paths(route.children, path),
				}),
			};
		});
	}
	Combine(parent: string, child: string): string {
		return `${parent.replace(/\/$/, '')}/${child.replace(/^\//, '')}`;
	}
	Url(path: string) {
		let url = {
			loc: this.Config.domain + '/#' + path,
			lastmod: this.date.toISOString().split('T')[0],
			priority: 0.8,
		};
		if (this.Config.locale.allowed.length > 1) {
			url['xhtml:link'] = [];

			this.Config.locale.allowed.forEach((iso: string) => {
				url['xhtml:link'].push({
					_attributes: {
						rel: 'alternate',
						hreflang: iso,
						href: this.Config.domain + '/#/' + iso + path,
					},
				});
			});
		}
		this.sitemap.urlset.url.push(url);
	}
	Save() {
		this.fs.writeFile(
			this.path.join(this.build, 'sitemap.xml'),
			this.XML.json2xml(this.sitemap, { compact: true }),
			(err: Error) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(
					'Sitemap created.',
					this.path.join(this.build, 'sitemap.xml')
				);
			}
		);
	}
}
new Sitemap();
 */
