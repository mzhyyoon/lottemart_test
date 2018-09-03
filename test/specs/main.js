require('chromedriver');

const {Builder} = require('selenium-webdriver');
const {assert, expect} = require('chai');
const C = require('../../constants');

let driver = new Builder()
    .withCapabilities({
        browserName: 'chrome',
        chromeOptions: {
            args : ['headless','disable-gpu'],
            mobileEmulation: {
                deviceName: 'iPhone 6/7/8 Plus'
            }
        }
    })
    .build();

describe('Mobile > Main', function () {
    before(async function () {
        await driver.get(C.mobileUrl);
    });

    after(function () {
        driver.quit();
    });

    it('Page Title 은 "롯데마트몰 - easy & slow life" 인가?', () => {
        return driver.getTitle().then((title) => {
            assert.equal(title, '롯데마트몰 - easy & slow life');
        });
    })
});