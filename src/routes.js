/**
 * @notice - Add Routes Here
 */

const { addRoute } = require('./../core/Route');

// add your requires here

// end of requires
// add routes here

addRoute('/' , () => {
    return {
        statusCode: 200 , 
        body: {
            "hello": "World"
        }
    }
});