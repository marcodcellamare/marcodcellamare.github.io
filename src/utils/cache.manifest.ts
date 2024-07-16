class CacheManifest {
	fs: any;
	path: any;
	root: string;
	build: string;
	exclude: string[];
	excludeExtensions: string[];
	cache: string[];

	constructor() {
		this.fs = require('fs');
		this.path = require('path');
		this.root = this.path.join(__dirname, '../../');
		this.build = this.path.join(this.root, 'build');
		this.exclude = ['.DS_Store'];
		this.excludeExtensions = ['.xml', '.txt'];
		this.cache = [];

		this.Folder = this.Folder.bind(this);
		this.Save = this.Save.bind(this);

		this.Init();
	}
	Init() {
		this.cache = this.Folder({});
		this.Save();
	}
	Folder({ dir, fileList }: { dir?: string; fileList?: string[] }): string[] {
		// Recursive function that reads the /this.build folder tree structure,
		// adding all the files into the cache array

		fileList = fileList || [];

		const file = this.fs.readdirSync(
			this.path.join(this.build + (dir ? '/' + dir : ''))
		);

		file.forEach((fileName: string) => {
			if (!this.exclude.includes(fileName)) {
				if (
					!this.fs
						.lstatSync(
							this.path.join(
								this.build +
									(dir ? '/' + dir : '') +
									'/' +
									fileName
							)
						)
						.isDirectory()
				) {
					if (
						!this.excludeExtensions.includes(
							this.path.extname(fileName)
						)
					)
						fileList.push((dir ? '/' + dir : '') + '/' + fileName);
				} else
					fileList = this.Folder({
						dir: (dir ? dir + '/' : '') + fileName,
						fileList,
					});
			}
		});
		return fileList;
	}
	Save() {
		// Function to save the cache array into a file

		this.cache.unshift('CACHE MANIFEST');

		this.fs.writeFileSync(
			this.path.join(
				this.build,
				'/' + process.env.REACT_APP_CACHE_MANIFEST
			),
			this.cache.join('\r\n')
		);
	}
}
new CacheManifest();
