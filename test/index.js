const {Builder} = require('selenium-webdriver');
const main = require('./specs/main');

let driver = new Builder()
    .withCapabilities({
        browserName: 'chrome',
        chromeOptions: {
            mobileEmulation: {
                deviceName: 'iPhone 6/7/8 Plus'
            }
        }
    }).build();

main(driver);

