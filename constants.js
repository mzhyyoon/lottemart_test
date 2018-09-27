const constants = {
    pageTitle: 'Lottemart TDD - Test',
    logo : {
        lottemart : {
            normal : '/static/images/m-logo-ver3.png',
            small : '/static/images/logo.png'
        }
    },
    hosts : {
        page : {
            development: 'http://localhost:3000',
            production: 'https://megazonetester.herokuapp.com'
        },
        api : {
            development: 'http://localhost:3001',
            production : 'https://api-tdd-test.herokuapp.com'
        }
    },
    messages : {
        noResult : 'No results found.'
    }
};

export default constants;