InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from './../index.js';

// test in console: curl -i localhost:3000

function handleRequest(request, response) {
    response.setHeader('X-Instrumented-By', 'LeandroPassos');
    response.end('Hello world!')
}

const server = http.createServer(handleRequest);
const port = 3000;
server.listen(port, () => console.log('server running at', server.address().port))