var wd = require('wd'),
    _ = require("lodash"),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

wd.configureHttp({
    timeout: 240000,
    retryDelay: 15000,
    retries: 5
});

function beforeEachExample(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    driver = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);

    driver
        .init({
            name: this.currentTest.title,
            browserName: '',
            appiumVersion: '1.5.3',
            deviceName: process.env.deviceName,
            platformVersion: process.env.platformVersion,
            platformName: process.env.platformName,
            app: 'https://github.com/appium/sample-code/blob/master/sample-code/apps/ApiDemos/bin/ApiDemos-debug.apk?raw=true'
        })
        .nodeify(done);
};

function afterEachExample(done) {
    driver
        .quit()
        .sauceJobStatus(this.currentTest.state === 'passed')
        .nodeify(done);
};

function makeSuite(desc, cb) {
    describe(desc, function() {
        var driver;

        this.timeout(240000);

        beforeEach(beforeEachExample);
        cb();
        afterEach(afterEachExample);
    });
};

exports.makeSuite = makeSuite;
