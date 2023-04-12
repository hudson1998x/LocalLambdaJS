const Cookie = require('./../core/Cookie');

const cookieTest = () => {
    const test = new Cookie(`pkg=math; equation=E%3Dmc%5E2`);
    console.log(test);
    console.log(test.toString());
}
cookieTest.label = 'Test Cookie Parse and Stringify';

module.exports = {
    cookieTest
}
