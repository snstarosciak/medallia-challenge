module.exports = {
	build_dir: 'build',
	app_files: {
		js: [ 'scripts/*.js' ],
		html: [ 'src/index.html' ],
		img: [ 'images/*.png', 'images/*.jpg', 'images/*.svg'],

		fontsvg: [ 'fonts/**/*.svg'], //, 'fonts/**/*.svg', 'fonts/**/*.ttf', 'fonts/**/*.woff'
		fonteot: [ 'fonts/**/*.eot'],
		fontttf: [ 'fonts/**/*.ttf'],
		fontwoff: [ 'fonts/**/*.woff'],
		fontwoff2: [ 'fonts/**/*.woff2']
	},
	vendor_files: {
		js: [
			'src/vendor/jquery-legacy/dist/jquery.min.js',
			'src/vendor/html5shiv/dist/html5shiv.min.js'
		]
	}
}