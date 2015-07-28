module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'src/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    'src/animate/uplayer-0.1.0.js'
                ]
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/running.js': [
                        'src/engine.js'
                    ]
                }
            }
        },
        express: {
            options: {
                port: 4000
            },
            dev: {
                options: {
                    script: 'dev/server.js'
                }
            }
        },
        watch: {
            express: {
                files: [
                    'dev/server.js'
                ],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            example: {
                files: [
                    'dev/index.html',
                    'dev/index.css',
                    'dev/example/*',
                ],
                options: {
                    livereload: true
                }
            },
            running: {
                files: [
                    'src/**/*'
                ],
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            release: {
                src: 'dist/running.js',
                dest: 'release/running-' + grunt.file.readJSON('package.json').version + '.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify', 'express:dev', 'watch']);
    grunt.registerTask('release', ['copy']);
};