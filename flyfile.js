var browserSync = require('browser-sync');
var proxy = 'http://localhost:2368';

var dest = './';
var assets = dest + 'assets';

var isProd = false;
var isWatch = false;
var isServer = false;

var src = {
	scripts: 'src/scripts/**/*.js',
	vendor: 'src/scripts/_lib/*.js',
	styles: 'src/styles/**/*.{sass,scss}',
	images: 'src/images/**/*.{jpg,png}',
	fonts: 'src/fonts/**/*.*',
	views: 'src/views/**/*.hbs',
	extras: 'src/*.{txt,json,webapp,ico}'
};

exports.default = function * () {
	/** @desc Default Task: `watch` */
	yield this.start('watch');
};

exports.watch = function * () {
	/** @desc Main Task: Starts a server & Recompiles files on change */
	isWatch = true;
	isProd = false;

	yield this.start('clean');
	yield this.watch(src.scripts, ['lint', 'scripts']);
	yield this.watch(src.vendor, 'vendor');
	yield this.watch(src.styles, 'styles');
	yield this.watch(src.images, 'images');
	yield this.watch(src.fonts, 'fonts');
	yield this.watch(src.views, 'views');
	yield this.start('extras');
	yield this.start('serve');
};

exports.build = function * () {
	/** @desc Main Task: Build the production files */
	isProd = true;
	isWatch = false;

	yield this.start('clean');
	yield this.start(['lint', 'fonts', 'views', 'extras']);
	yield this.start(['images', 'vendor', 'styles', 'scripts']);
	yield this.start('rev');
	yield this.start('cache');
};

// ###
// # Tasks
// ###

exports.clean = function * () {
	/** @desc Delete all built files in the root directory */
	yield this.clear([
		assets,
		dest + 'partials',
		'*.{txt,json,webapp,ico,hbs}'
	]);
};

exports.lint = function * () {
	/** @desc Lint javascript files */
	yield this.source(src.scripts).xo({
		globals: ['navigator', 'window', 'jQuery'],
		ignore: [src.vendor]
	});
};

exports.images = function * () {
	/** @desc Compress and copy all images to `dist` */
	yield this
		.source(src.images)
		.target(assets + '/img', {depth: 1});

	reload();
};

exports.fonts = function * () {
	/** @desc Copy all fonts to `dist` */
	yield this.source(src.fonts)
		.target(assets + '/fonts');
	reload();
};

exports.views = function * () {
	/** @desc Copy all HTML files to `dist`. Will run `htmlmin` during `build` task. */
	yield this.source(src.views).target(dest);
	return isProd ? yield this.start('htmlmin') : reload();
};

exports.extras = function * () {
	/** @desc Copy other root-level files to `dist` */
	yield this.source(src.extras).target(dest);
};

exports.vendor = function * () {
	/** @desc Concatenate vendor files into a `vendor.min.js` file.  */
	yield this.source(src.vendor)
		.concat('vendor.min.js')
		.target(assets + '/js');
};

exports.scripts = function * () {
	/** @desc Compile javascript files with Browserify. Will run `uglify` during `build` task.  */
	yield this
		.source('app/scripts/app.js')
		.browserify({
			transform: require('babelify').configure({presets: 'es2015'})
		})
		.concat('main.min.js')
		.target(assets + '/js');

	return isProd ? yield this.start('uglify') : reload();
};

exports.uglify = function * () {
	/** @desc Minify all javascript files already within `dist` */
	yield this.source(assets + '/js/*.js')
		.uglify({
			compress: {
				conditionals: true,
				comparisons: true,
				booleans: true,
				loops: true,
				/* eslint camelcase: 0 */
				join_vars: true,
				drop_console: true
			}
		})
		.target(assets + '/js');
};

exports.styles = function * () {
	/** @desc Compile and prefix stylesheets with vendor properties */
	yield this
		.source(src.styles)
		.sass({outputStyle: 'compressed'})
		.autoprefixer({
			browsers: [
				'ie >= 10',
				'ie_mob >= 10',
				'ff >= 30',
				'chrome >= 34',
				'safari >= 7',
				'opera >= 23',
				'ios >= 7',
				'android >= 4.4',
				'bb >= 10'
			]
		})
		.concat('main.min.css')
		.target(assets + '/css');

	reload();
};

exports.rev = function * () {
	/** @desc Version/Hashify production assets. (Cache-Busting) */
	var src = ['/css', '/js'].map(function (dir) {
		return assets + dir + '/**/*.*';
	});

	return this.source(src).rev({
		base: dest,
		replace: true
	});
};

exports.cache = function * () {
	/** @desc Cache assets so they are available offline! */
	yield this
		.source(dest + '/**/*.{js,css,png,jpg,gif}')
		.precache({
			root: dest,
			cacheId: 'fly-starter-kit',
			stripPrefix: dest
		});
};

exports.serve = function * () {
	/** @desc Launch a local server from the `dist` directory. */
	isServer = true;

	browserSync({
		notify: false,
		logPrefix: 'Fly',
		proxy: proxy
	});
};

// helper, reload browsersync
function reload() {
	if (isWatch && isServer) {
		browserSync.reload();
	}
}
