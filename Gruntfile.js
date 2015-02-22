module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

  grunt.initConfig({




    browserSync: {
      options: {
        watchTask: true,
        server: 'site',
        open: 'external',
        notify: false
      },
      files: 'site/**/*'
    },


    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/scss/framework',
          src: '**/*.scss',
          dest: 'site/lib/css',
          ext: '.min.css'
        }]
      }
    },


    autoprefixer: {
      options: {
        browsers: [
          'last 5 version',
          'safari 6',
          'ie 9',
          'opera 12.1',
          'ios 6',
          'android 4'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'site/lib/css',
          src: '**/*.css',
          dest: 'site/lib/css'
        }]
      }
    },


    uglify: {
      dist: {
        files: {
          'site/lib/js/main.min.js': 'src/js/main.js'
        }
      }
    },


    clean: {
      html: { src: 'site/**/*.html' }
    },


    assemble: {
      options: {
        partials: 'src/templates/includes/**/*.html',
        layoutdir: 'src/templates/layouts',
        layoutext: '.html',
        layout: 'default',
        data: 'src/templates/data/**/*.{json,yml}',
        flatten: true
      },
      pages: {
        src: [
          'src/templates/**/*.html',
          '!src/templates/includes/**/*',
          '!src/templates/layouts/**/*',
          '!src/templates/data/**/*'
        ],
        dest: 'site'
      }
    },


    watch: {
      html: {
        files: 'src/templates/**/*',
        tasks: ['clean:html', 'assemble:pages'],
        options: {
          spawn: false
        }
      },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass:dist', 'autoprefixer:dist'],
        options: {
          spawn: false
        }
      },

      uglify: {
        files: 'src/js/main.js',
        tasks: 'uglify',
        options: {
          spawn: false
        }
      }
    }




  });

  grunt.registerTask('default', [
    'browserSync',
    'sass:dist',
    'autoprefixer:dist',
    'uglify:dist',
    'clean:html',
    'assemble:pages',
    'watch'
  ]);

};