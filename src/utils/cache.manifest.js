class CacheManifest {
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
		this.cache = this.Folder();
		this.Save();
	}
	Folder(dir, fileList) {
		fileList = fileList || [];

		const file = this.fs.readdirSync(this.path.join(this.build + (dir ? '/' + dir : '')));

		file.forEach(fileName => {
			if (!this.exclude.includes(fileName)) {
				if (!this.fs.lstatSync(this.path.join(this.build + (dir ? '/' + dir : '') + '/' + fileName)).isDirectory()) {
					if (!this.excludeExtensions.includes(this.path.extname(fileName)))
						fileList.push((dir ? '/' + dir : '') + '/' + fileName);
				} else
					fileList = this.Folder((dir ? dir + '/' : '') + fileName, fileList);
			}
		});
		return fileList;
	}
	Save() {
		this.cache.unshift('CACHE MANIFEST');
		this.fs.writeFileSync(this.path.join(this.build, '/' + process.env.REACT_APP_CACHE_MANIFEST), this.cache.join('\r\n'));
	}
}
new CacheManifest();