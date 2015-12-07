'use strict';

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
        mocha_parallel: {
            options: {
                args: function(suiteName) {
                    return [];
                },
                env: function(suiteName) {
                    process.env.platformName = grunt.option('platformName');
                    process.env.platformVersion = grunt.option('platformVersion');
                    process.env.deviceName = grunt.option('deviceName');
                    return process.env;
                },
                report: function(suite, code, stdout, stderr) {
                    if (stdout.length) {
                      process.stdout.write(stdout);
                    }
                    if (stderr.length) {
                      process.stderr.write(stderr);
                    }
                },
                done: function(success, results) {
                },
                mocha: './node_modules/.bin/mocha'
            }
        },
        
        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: ['run_Google_Nexus_7_HD_Emulator', 'run_Samsung_S4_real_device']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('Google_Nexus_7_HD_Emulator', function(n) {
      grunt.option('platformName', 'Android');
      grunt.option('platformVersion', '4.4');
      grunt.option('deviceName', "Google Nexus 7 HD Emulator");
    });

    grunt.registerTask('Samsung_S4_real_device', function(n) {
      grunt.option('platformName', 'Android');
      grunt.option('platformVersion', '4.4');
      grunt.option('deviceName', "Samsung Galaxy S4 Device");
    });

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_Google_Nexus_7_HD_Emulator', ['Google_Nexus_7_HD_Emulator', 'mocha_parallel']);
    grunt.registerTask('run_Samsung_S4_real_device', ['Samsung_S4_real_device', 'mocha_parallel']);
    
};

