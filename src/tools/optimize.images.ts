import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { performance } from 'perf_hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = dotenv.config().parsed;

const rootDir = '../../';
const imagesDir = path.join(__dirname, rootDir, 'public/images');
const imageFiles: string[] = [];
const imageDirs: Set<string> = new Set();

const optimizedDir = env?.VITE_OPTIMIZED_IMAGES_DIR ?? '';
const optimizedSizes: number[] =
	env?.VITE_OPTIMIZED_IMAGES_SIZES.split('|').map(Number) ?? [];
const optimizedSizeDefault: number =
	Number(env?.VITE_OPTIMIZED_IMAGES_DEFAULT_SIZE) && 1200;
const optimizedFormats: string[] =
	env?.VITE_OPTIMIZED_IMAGES_FORMATS.split('|') ?? [];

const args = process.argv.slice(2);

const isValid = () => {
	if (!optimizedDir || !optimizedSizes || !optimizedFormats) {
		console.error('❌❌ No .env VITE_OPTIMIZED_IMAGES_ found.');
		return false;
	}
	return true;
};

// Clean up and prepare output directories
const cleanup = () => {
	if (!isValid) return;

	imageFiles.forEach((file) => {
		const parsed = path.parse(file);
		const optimizedPath = path.join(parsed.dir, optimizedDir);

		if (!imageDirs.has(parsed.dir)) {
			imageDirs.add(parsed.dir);

			if (fs.existsSync(optimizedPath)) {
				fs.rmSync(optimizedPath, { recursive: true, force: true });
			}
			optimizedSizes.forEach((size) => {
				fs.mkdirSync(path.join(optimizedPath, `${size}`), {
					recursive: true,
				});
			});
		}
	});
	console.log(`✅✅ Successfully cleaned up ${optimizedDir}`);
};

// Recursively collect .jpg/.jpeg/.png files
const getImageFiles = (dir: string): string[] => {
	if (!isValid) return [];
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		const regex = new RegExp(`${optimizedDir}$`, 'i');

		if (stat.isDirectory()) {
			if (!regex.test(filePath))
				imageFiles.push(...getImageFiles(filePath));
		} else if (/\.(jpe?g|png)$/i.test(file)) {
			imageFiles.push(filePath);
		}
	});
	return imageFiles;
};

// Parse CLI args
// Add -- filename1.ext folder/filename2.ext ... filenameN.ext to optimize specific images
const getImageFilesFromArgs = () => {
	const files = [...new Set(args)];

	files.map((file) => {
		if (/\.(jpe?g|png)$/i.test(file))
			imageFiles.push(path.join(imagesDir, file));
	});
};

const optimizeFile = (
	file: string,
	format: string,
	size: number,
	destination: string
) =>
	sharp(file)
		.resize({
			width: size,
			height: size,
			fit: 'inside',
			kernel: sharp.kernel.nearest,
			withoutEnlargement: true,
			fastShrinkOnLoad: true,
		})
		.jpeg({
			quality: 50,
			progressive: true,
			mozjpeg: true,
			chromaSubsampling: '4:2:0',
		})
		.png({
			quality: 50,
			compressionLevel: 9,
			adaptiveFiltering: true,
			palette: true,
			effort: 6,
		})
		.webp({
			quality: 50,
			alphaQuality: 50,
			nearLossless: true,
			smartSubsample: true,
			smartDeblock: true,
			effort: 4,
		})
		.avif({
			quality: 30,
			chromaSubsampling: '4:2:0',
			effort: 7,
		})
		.toFormat(format as keyof sharp.FormatEnum)
		.toFile(destination)
		.then(() => {
			console.log(
				`✅ ${file.replace(
					imagesDir,
					''
				)} → .${format}/${size}px → ${destination.replace(
					imagesDir,
					''
				)}`
			);
		})
		.catch((err) => {
			console.error(
				`❌ ${file.replace(
					imagesDir,
					''
				)} → .${format}/${size}px → ${destination.replace(
					imagesDir,
					''
				)}`,
				err
			);
		});

// Perform optimization
const optimize = async () => {
	if (!isValid || imageFiles.length === 0) return;

	const tasks: Promise<unknown>[] = [];

	imageFiles.forEach((file) => {
		const parsed = path.parse(file);
		const optimizedPath = path.join(parsed.dir, optimizedDir);

		optimizedFormats.forEach((format) => {
			const actualFormat =
				format === '@own' ? parsed.ext.replace('.', '') : format;

			if (format !== '@own') {
				optimizedSizes.forEach((size) => {
					const destinationFile = path.join(
						optimizedPath,
						`${size}`,
						`${parsed.name}.${actualFormat}`
					);

					const task = optimizeFile(
						file,
						actualFormat,
						size,
						destinationFile
					);
					tasks.push(task);
				});
			} else {
				const destinationFile = path.join(
					optimizedPath,
					`${parsed.name}.${actualFormat}`
				);
				const task = optimizeFile(
					file,
					actualFormat,
					optimizedSizeDefault,
					destinationFile
				);
				tasks.push(task);
			}
		});
	});
	await Promise.all(tasks);
};

// Run
const start = performance.now();

// Cleanup
if (args?.[0] !== 'cleanup') {
	// Collect files
	if (args.length > 0) {
		getImageFilesFromArgs();
	} else {
		getImageFiles(imagesDir);
	}

	optimize().then(() => {
		const end = performance.now();
		const duration = end - start;
		const minutes = Math.floor(duration / 60000);
		const seconds = ((duration % 60000) / 1000).toFixed(2);

		console.log('✅✅ Image optimization completed.');
		console.log(`⏱️ Total time: ${minutes}m ${seconds}s`);
	});
} else {
	cleanup();
}
