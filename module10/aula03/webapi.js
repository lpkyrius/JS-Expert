import http from 'http'
import { Readable } from 'stream'


// curl localhost:3000
// curl localhost:4000
// curl localhost:4000 | tee log.txt

function api1(request, response) {
    
    // <block of test>
    
    // response.write('test01\n')
    // response.write('test02\n')
    // response.write('test03\n')

    // request.pipe(response)

    // </block of test>

    let count = 0;
    const maxItems = 99

    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => { //intervalContext to provide the Interval id. So, we can stop it below.
                if(count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Leandro-${count}`}) + '\n')
                    return;
                }
                clearInterval(intervalContext) // stops the Interval execution
                this.push(null) // says to NodeJS that our promise has finished
            }
            // to stop Interval we need its context 'this'
            // that's why we past IntervalContext as a parameter above
            // and use 'this' below
            setInterval( function() { everySecond(this) })
        },
    })

    readable.pipe(response)
}

function api2(request, response) {
    let count = 0;
    const maxItems = 99

    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => { //intervalContext to provide the Interval id. So, we can stop it below.
                if(count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Other-Guy-${count}`}) + '\n')
                    return;
                }
                clearInterval(intervalContext) // stops the Interval execution
                this.push(null) // says to NodeJS that our promise has finished
            }
            // to stop Interval we need its context 'this'
            // that's why we past IntervalContext as a parameter above
            // and use 'this' below
            setInterval( function() { everySecond(this) })
        },
    })

    readable.pipe(response)  
}

http.createServer(api1).listen(3000, () => {
    console.log('Server is running on port 3000')
})
http.createServer(api2).listen(4000, () => {
    console.log('Server is running on port 4000')
})