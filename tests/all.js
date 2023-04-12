const cookieTests = require('./cookie.test');

Object.keys(cookieTests).forEach((test) => {
    try{
        cookieTests[test]();
        console.log('[TEST] (Pass) ' + cookieTests[test].label);
    }catch(e){
        console.log('[TEST] (Fail) ' + e.message);
        console.error(e);
    }
})