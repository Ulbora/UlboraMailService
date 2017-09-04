/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['test/**/*Test.js']
            },
            testMysql: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['test/database/mysql/**/*Test.js']
            },
            testMailer: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['test/mailer/**/*Test.js']
            },
            testMysqlDbOnly: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['test/database/mysql/**/*Test.js']
            },
            testDbOnly: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['test/database/**/*Test.js']
            },
            testIndividualTestOnly: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                //src: ['test/webControllers/tokenControllerTest.js']
                src: ['test/database/dbTest.js']
                //src: ['test/database/mysql/dbTest.js']
                //src: ['test/database/mysql/processors/roleProcessorTest.js']
                //src: ['test/managers/mailManagerTest.js']
                //src: ['test/managers/clientRedirectUriManagerTest.js']
                //src: ['test/delegates/credentialsGrantDelegateTest.js']
                //src: ['test/services/serviceTest.js']
                //src: ['test/oauth2/oauth2Test.js']
                //src: ['test/proxies/tokenValidationProxyTest.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('mocha-test-all', 'mochaTest:test');
    grunt.registerTask('mocha-mysqlTest', 'mochaTest:testMysql');
    grunt.registerTask('mocha-mailerTest', 'mochaTest:testMailer');
    grunt.registerTask('mocha-mysqlDbOnlyTest', 'mochaTest:testMysqlDbOnly');
    grunt.registerTask('mocha-DbOnlyTest', 'mochaTest:testDbOnly');
    grunt.registerTask('mocha-IndividualOnlyTest', 'mochaTest:testIndividualTestOnly');

};
