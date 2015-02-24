'use strict';

module.exports = function(grunt) {

  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-clean');

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['public'],
    copy: {
      main:{
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade', '!**/*.{scss,sass}'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
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
    watch: {
      files: ['app/**/*'],
      tasks: ['build'],
      options: {
        reload: true
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
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass', 'autoprefixer']);
  grunt.registerTask('serve', ['build', 'watch']);

};