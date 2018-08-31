const {assert, expect} = require('chai');
const C = require('../../constants');


module.exports = (driver) => {
    describe('Mobile > Main', function () {
        this.timeout(20000);

        beforeEach(async function () {
            await driver.get(C.mobileUrl);
        });

        afterEach(function () {
            driver.quit();
        });

        it('Page Title 은 "롯데마트몰 - easy & slow life" 인가?', () => {
            return driver.getTitle().then((title) => {
                assert.equal(title, '롯데마트몰 - easy & slow life');
            });
        })
    });
};