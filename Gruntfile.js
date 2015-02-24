'use strict';

module.exports = function(grunt) {

  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-clean');

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      temp: ['.tmp'],
      dist: ['public']
    },
    copy: {
      main:{
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade', '!**/*.{scss,sass}', '!**/*.js'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {expand: true, cwd: 'app/', src: ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}
        ]
      }
    },
    sass: {
      options: {
        sourceMap: true
        },
      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        //browsers: ['> 1% in US']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'public/css/*.css',
        dest: 'public/css/'
      }
    },
    wiredep: {
      build: {
        src: ['public/**/*.html']
      }
    },
    connect: {
      options: {
        port: 8888,
        open: true,
        useAvailablePort: true,
        hostname: 'localhost'
      },

      server: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('public'),
              connect().use('/scripts', connect.static('./app/scripts')),
              connect().use('/bower_components', connect.static('./bower_components'))
            ];
          }
        }
      }
    },
    usemin: {
      html: ['public/**/*.html']
    },
    useminPrepare: {
      html: ['public/index.html'],
      options: {
        dest: 'public',
        root: 'app'
      }
    },
    watch: {
      files: ['app/**/*', 'bower.json'],
      tasks: ['build'],
      options: {
        reload: true
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass', 'autoprefixer', 'wiredep', 'combineJs']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);
  grunt.registerTask('combineJs', [
    'clean:temp',
    'wiredep',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin',
    'clean:temp'
  ]);

};