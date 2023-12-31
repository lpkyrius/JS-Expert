// -------------------------------
//   ls | grep pack | xargs cat | jq .name   

// -------------------------------
// process.stdin.pipe(process.stdout)
//     .on('data', msg => console.log('data', msg.toString()))
//     .on('error', msg => console.log('error', msg.toString()))
//     .on('end', _ => console.log('end'))
//     .on('close', _ => console.log('close'))

// -------------------------------
// creating our server - terminal 2
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// creating a client - terminal 1
// node -e "process.stdin.pipe(require('net').connect(1338))"

// -------------------------------
// Let's generate a big file here
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
        .pipe(res) // pipe manage memory much better (internally)

}).listen(3000, () => console.log('running at 3000'))

// let's run catching the output into the output.txt file
// curl localhost:3000 -o output.txt