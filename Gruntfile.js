module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');	
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	var userConfig = require('./build.config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON('package.json'),

		clean: [
			'<%= build_dir %>'
		],

		index: {
			build: {
				dir: '<%= build_dir %>',
				src: [
					'<%= vendor_files.js %>',
					'<%= build_dir %>/scripts/**/*.js',
					'<%= build_dir %>/assets/**/*.css'
				]
			}
		},

		copy: {
			appjs: {
				files: [
					{
						src: [ '<%= app_files.js %>' ],
						dest: '<%= build_dir %>/',
						cwd: 'src/',
						expand: true
					}
				]
			},			
			vendor: {
				files: [
					{
						src: [ '<%= vendor_files.js %>' ],
						dest: '<%= build_dir %>',
						cwd: '.',
						expand: true
					}
				]
			},
			images: {
				files: [
					{
						src: [ '<%= app_files.img %>' ],
						dest: '<%= build_dir %>/assets/',
						cwd: 'src/',
						expand: true
					}
				]
			},
			fonts: {
				files: [
					{
						src: [ '<%= app_files.fontsvg %>',
							   '<%= app_files.fonteot %>',
							   '<%= app_files.fontttf %>',
							   '<%= app_files.fontwoff %>' ],
						dest: '<%= build_dir %>/assets/',
						cwd: 'src/sass/',
						expand: true
					}
				]
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: [ '<%= app_files.html %>' ],
				tasks: [ 'index:build' ]
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: [],
				options: {
					livereload: false
				}
			},
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: [ 'sass']
			},
			images: {
				files: [ '<%= app_files.img %>' ],
				tasks: [ 'copy:images']
			}
		},


		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/sass/main.scss'
				}
			}
		},

		nodemon: {
			dev: {
				script: 'server/server.js',
				options: {
					file: 'server/server.js',
					watchedFolders: ['server']
				}
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

	}

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
	grunt.registerTask('default', ['build', 'concurrent']);
	grunt.registerTask('build', [
		'clean', 'copy', 'sass', 'index'
	]);

	grunt.registerMultiTask('index', 'Process index.html template', function() {
		var dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g'),
			jsFiles = filterForJS(this.filesSrc).map(function(file){
				return file.replace(dirRE, '');
			});
		var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '');
		})

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
			process: function (contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config('pkg.version')
					}
				});
			}
		});

	});

	function filterForJS(files) {
		return files.filter(function(file) {
			return file.match(/\.js$/);
		});
	}

	function filterForCSS(files) {
		return files.filter(function (file) {
			return file.match(/\.css$/);
		})
	}

}