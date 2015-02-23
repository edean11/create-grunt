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
          'public/css/main.css': 'app/css/main.scss'
        }
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass']);

};