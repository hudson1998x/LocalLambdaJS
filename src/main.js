/**
 * @warning - Do not modify this file, this is simply an entrypoint for the lambda
 *          - this will pass through any cookies etc.. and return the response
 *          - from the functions. 
 */

const Cookie = require('./../core/Cookie');
const { executeRoute } = require('./../core/Route');
const config = require('./../config.json');
require('./routes');

module.exports = async (httpEvent) => {
    const cookie = new Cookie(httpEvent.headers['cookie'] ?? '');
    const headers = {};
    let statusCode = 200;
    let body = {};

    const resp = await executeRoute(httpEvent.requestContext.path , {
        cookie
    });

    body = resp.body;
    statusCode = resp.statusCode;
    for(let header in resp.headers){
        header[header] = resp.headers[header];
    }
    // console.log(httpEvent);
    if ( httpEvent.httpMethod == 'OPTIONS' ) {
        statusCode = 204;
        if ( config.crossOrigin.enabled ) {
            if ( process.env.IS_LOCAL || config.crossOrigin.origins.indexOf(httpEvent.headers.origin) > -1 ) {
                headers['Access-Control-Allow-Origin'] = config.crossOrigin.origins.join(''), /* @dev First, read about security */
                headers['Access-Control-Allow-Methods'] = config.crossOrigin.methods.join(', '); //'OPTIONS, POST, GET',
                headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
                headers['Access-Control-Allow-Credentials'] = true;
            }
        }
    }

    return {
        headers , 
        statusCode , 
        body
    }
}