const http = require('http');
const handler = require('./src/main');
const config = require('./config.json');

const PORT = process.env.HTTP_PORT ? process.env.HTTP_PORT : config.server.httpPort;

const server = http.createServer((req , res) => {
    process.env.IS_LOCAL = true;
    if ( req.method == 'POST' || req.method == 'PUT' || req.method == 'PATCH' ) {
        let data = '';
        req.on('data' , (part) => {
            data += part;
        });
        req.on('end' , () => {
            req.post = post;
            singleEntryPoint(req , res);
        });
    } else {
        singleEntryPoint(req , res);
    }

}); 
server.listen(PORT);

const singleEntryPoint = async (req , res) => {
    const lambdaHttp = {
        body: req.body ?? '' , 
        headers: req.headers , 
        requestContext: {
            path: req.url.toString() , 
            httpMethod: req.method.toUpperCase() , 
        } , 
        path: req.url.toString() , 
        httpMethod: req.method
    };

    const { body , statusCode , headers } = await handler(lambdaHttp);

    for(let header in headers) {
        res.setHeader(header , headers[header]);
    }
    res.statusCode = statusCode ?? 200;

    res.end(JSON.stringify(body));
};