// -------------------------------
//   ls    
//   ls | grep pack    
//   ls | grep pack | xargs cat   
//   ls | grep pack | xargs cat | jq .name   

// -------------------------------
// .pipe is like the |, so, it grab the previous result and send it to the next command
// 
// process.stdin.pipe(process.stdout)
//     .on('data', msg => console.log('data', msg.toString())) // without .toString() it will be the buffer <buffer...
//     .on('error', msg => console.log('error', msg.toString()))
//     .on('end', _ => console.log('end')) // only inform the stream has finished
//     .on('close', _ => console.log('close'))

// -------------------------------
// open 2 terminals to communicate one with other:
// creating our server - terminal 2
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// creating a client - terminal 1
// node -e "process.stdin.pipe(require('net').connect(1338))"

// -------------------------------
// Let's generate a big file here using terminal
// 1e9 is 1 followed by 9 zeros 1.000.000.000
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file 

// now an api to return this file

import http from 'http'
import { createReadStream, readFileSync } from 'fs'
http.createServer((req, res) => {

    // <bad practice for big files>
    // .toString() will brake because the string will be too long
    // Error: Cannot create a string longer than 0x1fffffe8 characters
    // const file = readFileSync('big.file').toString() 

    // this one will work
    // const file = readFileSync('big.file')

    // res.write(file)
    // res.end()
    // </bad practice for big files>

    // a better solution is
    createReadStream('big.file')
        .pipe(res) // pipe manage memory much better (internally) I can see that now I don't have a big change in my computer memory use

}).listen(3000, () => console.log('running at 3000'))

// let's run catching the output into the output.txt file
// run the file 1.native-stream.js and in the terminal run the following command:
// curl localhost:3000 -o output.txt