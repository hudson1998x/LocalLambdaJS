
class Cookie {
    constructor(cookieStr) {
        this.data = 
        cookieStr.split(';')
            .map(v => v.split('='))
            .reduce((acc, v) => {
                if ( !v[0] || !v[1] ) {
                    return acc;
                }
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {});
    }
    getItem(key){
        return this.data[key];
    }
    setItem(key , value){
        this.data[key] = value;
        return this;
    }
    toString(){
        return Object.keys(this.data).map((k) => {
            return `${k}=${encodeURIComponent(this.data[k])}`
        }).join(';') + ';';
    }
}

module.exports = Cookie;