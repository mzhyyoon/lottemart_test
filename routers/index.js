const user = require('./user');

module.exports = () => {
    return {
        '/' : {page : '/'},
        '/testcase' : {page : '/testcase'},
        '/404' : {page : '/404'},
        '/about' : {page : '/about'}
    }
}