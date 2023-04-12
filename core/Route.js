const routes = {};

const addRoute = (url , listener) => {
    if ( typeof listener !== 'function' ) {
        routes[url] = () => {
            return {
                headers: {} , 
                statusCode: 404 , 
                body: {
                    error: 'Routing Error'
                }
            };
        };
    } else {
        routes[url] = listener;
    }
}
const executeRoute = async (url , context) => {

    if ( !routes[url] ) {
        return {
            statusCode: 404 , 
            body: {
                error: "Unknown route: " + url
            }
        };
    }
    try{
        return await routes[url](context);
    }catch(e){
        console.error(e);
        return {
            headers: {} , 
            statusCode: 500 , 
            body: {
                error: 'Internal Server Error'
            }
        };
    }
}
const cors = (headers) => {
    
}
module.exports = {
    addRoute , 
    executeRoute , 
    cors
}