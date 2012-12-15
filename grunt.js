module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      name: "Joy.js",
      banner: '/* \n' +
        ' * <%= meta.name %> - v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n' +
        ' * Build date: <%= grunt.template.today("m/d/yyyy") %>\n' +
        ' */'
    },
    concat: {
      dist: {
        src: ['<banner>', 'lib/*.js', 'lib/*/**.js'],
        dest: 'dist/joy.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/joy.js'],
        dest: 'dist/joy.min.js'
      }
    },
    qunit: {
      all: ['test/index.html']
    },
    lint: {
      all: ['grunt.js', 'lib/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        nocode: 'true',
        themedir: 'doctheme/',
        options: {
          paths: 'lib/',
          outdir: 'doc/'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min qunit'); //  yuidoc

  // Test task
  grunt.registerTask('test', 'concat qunit'); //  yuidoc

  // Travis CI task.
  grunt.registerTask('travis', 'lint test');

  // Generate only documentation.
  grunt.registerTask('docs', 'yuidoc');
};
