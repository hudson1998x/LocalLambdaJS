# Locally Tested Lambda Environment

This repository allows you to create Lambda based web services, with the ability to test
offline. 

This can be used in production too, I have provided basic functionality.

# how to use

Locally, you can use ```npm test```

When you deploy to AWS, you'll have to have a function URL setup for this
using the API gateway and reference this service in your frontend applications

# testing

For testing you should run ```npm run unit-test```, I don't use any fancy testing library
as it adds unnecessary dependencies to the package.

# example test addition

## myExtraTest.js

```
const cookieTest = () => {
    const test = new Cookie(`pkg=math; equation=E%3Dmc%5E2`);
    console.log(test);
    console.log(test.toString());
}
cookieTest.label = 'Test Cookie Parse and Stringify';

module.exports = {
    cookieTest
}
```

## all.js
```
const myExtraTests = require('./Path/To/Tests');
Object.keys(myExtraTests).forEach((test) => {
    try{
        myExtraTests[test]();
        console.log('[TEST] (Pass) ' + myExtraTests[test].label);
    }catch(e){
        console.log('[TEST] (Fail) ' + e.message);
        console.error(e);
    }
})
```