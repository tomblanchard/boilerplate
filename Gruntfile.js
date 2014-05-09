module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({




    connect: {
      server: {
        options: {
          port: 9999,
          base: 'site',
          hostname: '*',
          middleware: function(connect, opts) {
            return [
              require('connect-livereload')(),
              connect.static(require('path').resolve(__dirname + '/site'))
            ];
          }
        }
      }
    },


    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/scss/framework',
          src: ['**/*.scss'],
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
          src: ['**/*.css'],
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
      html: { src: ['site/**/*.html'] }
    },


    includes: {
      dist: {
        cwd: 'src/templates',
        src: ['**/*.html', '!includes/**/*'],
        dest: 'site',
        options: {
          flatten: true,
          includeRegexp: /^(\s*){% include\s+"(\S+)" %}\s*$/,
          includePath: 'src/templates/includes'
        }
      }
    },


    watch: {
      html: {
        files: 'src/templates/**/*.html',
        tasks: ['clean:html', 'includes:dist'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass:dist', 'autoprefixer:dist'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      uglify: {
        files: 'src/js/main.js',
        tasks: ['uglify'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }




  });

  grunt.registerTask('default', [
    'connect',
    'sass:dist',
    'autoprefixer:dist',
    'uglify:dist',
    'includes:dist',
    'watch'
  ]);

};