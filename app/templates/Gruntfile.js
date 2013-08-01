module.exports = function(grunt) {

	// Configuration
	// =======================================
	grunt.initConfig({

		// Server
		connect: {
			server: {
				options: {
					port: 8989
				}
			}
		},

		// Watch
		watch: {
            bower: {
                files: ['scripts/vendor/bower/**/*'],
                tasks: ['bower']
            }
            // Setup a LiveReload server.
            options: { livereload: true },
			files: [
				'scripts/vendor/libs/**/*',
				'scripts/**/*.js',
				'styles/**/*.scss',
				'styles/**/*.sass',
				'**/*.jade',
				'source/icons/*',

                // Ignore:
                '!styles/exts/_icons.scss'
			],
			tasks: ['sass', 'jade', 'fontcustom', 'jshint']
		},

		// Compile SASS/SCSS
		// Since all other stylesheets are @import-ed in index.scss,
		// that's the only one we need to compile.
		sass: {
			app: {
				files: {
					'styles/index.css': 'styles/index.sass'	
				}
			}
		},

		// Compile Jade templates.
		jade: {
			compile: {
				options: {
					pretty: true,
					client: false
				},
                files: [{
                    expand: true,
                    cwd: '.',
                    src: '**/*.jade',
                    dest: '.'
                }]
			}
		},

        bower: {
            main: {
                rjsConfig: 'app/config.js'
            }
        },

        // JS linting with JSHint.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['scripts/**/*.js']
        },

        csslint: {
            main: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['styles/index.css']
            }
        },

		shell: {
            // Compile Font Custom font.
			fontcustom: {
				command: 'fontcustom compile source/icons'
			}
		},
		copy: {
            // Copy Font Custom fonts to proper place.
			fontcustom: {
				files: [
					{src: ['source/icons/fontcustom/*.woff'], dest: 'app/styles/fonts/icons.woff'},
					{src: ['source/icons/fontcustom/*.eot'],  dest: 'app/styles/fonts/icons.eot'},
					{src: ['source/icons/fontcustom/*.svg'],  dest: 'app/styles/fonts/icons.svg'},
					{src: ['source/icons/fontcustom/*.ttf'],  dest: 'app/styles/fonts/icons.ttf'}
				]
			}
		},
		replace: {
            // Replace Font Custom CSS.
			fontcustom: {
				src: ['source/icons/fontcustom/fontcustom.css'],
				dest: ['styles/exts/_icons.scss'],
				replacements: [{
					from: /fontcustom_[^.]+/g,
					to: 'fonts/icons'
				}, {
					from: 'fontcustom',
					to: 'icons'
				}]
			}
		},


        /*== Release ================================================*/

        // Clean out the release directory
        // to remove old files.
        clean: ['release/'],

        // Optimize RequireJS scripts.
        requirejs: {
            compile: {
                options: {
                    almond: true,                       // Use Almond instead of RequireJS.
                    mainConfigFile: 'scripts/config.js',
                    baseUrl: 'scripts',
                    out: 'release/require.js',
                    name: 'config'
                }
            }
        },

        // Minify CSS.
        cssmin: {
            report: 'gzip',
            files: {
                'release/app/index.css': ['dev/app/index.css']
            }
        },

        // Compress PNG and JPG images.
         imagemin: {
             main: {
                 options: {
                     optimizationLevel: 3,              // Optimization level (png).
                     progressive: true                  // Loseless conversion to progressive (jpg).
                 },
                 files: [{
                     expand: true,
                     cwd: 'assets/images',
                     src: '{,*/}*.{png,jpg,jpeg}',
                     dest: 'release/assets/images'
                 }]
             }
         }

	});

	// Define grunt tasks
	// =======================================
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('fontcustom', ['shell:fontcustom', 'copy:fontcustom', 'replace:fontcustom']);
    grunt.registerTask('build', ['clean', 'cssmin', 'imagemin', 'requirejs']);

	// Load grunt packages
	// =======================================
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-shell');

};
