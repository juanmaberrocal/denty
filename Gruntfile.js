module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		/*=======
		compilers
		=======*/
		// compile sass files
		sass: {
			// standard app css
			app: {
				files: [{
					// compile files and place into source
					expand: true,
					cwd: "css/styles",
					src: ["*.scss"],
					dest: "css/source",
					ext: ".css"
				}]
			},
			// domain specific custom css
			custom: {
				files: [{
					// compile files and place into source/custom
					expand: true,
					cwd: "css/styles/custom",
					src: ["*.scss"],
					dest: "css/source/custom",
					ext: ".css"
				}]
			}
		},
		// compile js files

		/*===========
		concatenators
		===========*/
		concat: {
			// concat css files
			css: {
				options: {
					separator: "\n"
				},
				// concat all files from source into master file in css
				// ensure application defined first
				src: ["css/source/animations.css", "css/source/typeface.css", "css/source/denty.css", "css/source/*.css"],
				dest: "css/denty-app.css"
			},
			// concat js files
			js: {
				options: {
					separator: ";\n"
				},
				// concat all files from scripts into master file in js
				// ensure application defined first
				src: ["js/scripts/dentyApp.js", "js/scripts/**/*.js"],
				dest: "js/dentyApp.js"
			}
		},

		/*=========
		compressors
		=========*/
		// minify css
		cssmin: {
			app: {
				options: {
					banner: "/*! DentyApp.css <%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> Licensed */"
				},
				files: {
					"css/denty-app.min.css": "css/denty-app.css"
				}
			},
			custom: {
				options: {
					// TODO: name properly
					banner: "/*! DentyApp-Custom.css <%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> Licensed */"
				},
				files: [{
					// minify custom files individually and place into root css
					expand: true,
					cwd: "css/source/custom",
					src: ["*.css"],
					dest: "css/",
					ext: ".min.css"
				}]
			}
		},

		// minify js
		uglify: {
			dist: {
				options: {
					banner: "/*! DentyApp.js <%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> Licensed */"
				},
				files: {
					"js/dentyApp.min.js": "js/dentyApp.js"
				}
			}
		}

		/*=====
		watcher
		=====*/
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// compile styles and concat result into dist mini css
	grunt.registerTask("css", [
		// base app css
		"sass:app", "concat:css", "cssmin:app", 
		// custom domain css
		"sass:custom", "cssmin:custom"
	]);

	// compile scripts and concat result into dist mini js
	grunt.registerTask("js", ["concat:js", "uglify"]);

	// default task watches over file changes
	grunt.registerTask("default", []);
};