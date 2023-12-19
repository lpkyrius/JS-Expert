import Http from 'http';
async function InjectHttpInterceptor() {
    // http events have emit
    const oldEmit = Http.Server.prototype.emit;
    // keeping all the arguments ...
    Http.Server.prototype.emit = function (...args){
        // According to NodeJS documentation, the positions are
        const [ type, req, response ] = args;

        if (type === 'request') {
            response.setHeader('X-Instrumented-By', 'LeandroPassos');
        }

        // executing the function that already exists in Http
        return oldEmit.apply(this, args);
    }

}

export { InjectHttpInterceptor }