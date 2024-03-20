/*
Notification Pattern / Domain Notifications**
Part of Domain Driven Design
*/

import { createServer } from 'http'
import { statusCodes } from '../src/util/httpStatusCodes.js'
import HeroEntity from './util/heroEntity.js'

async function handler(request, response) {
    for await (const data of request) {
        try {
            const parsedData = JSON.parse(data)
            // to simulate another error such as DB error
            if (Reflect.has(parsedData, "connectionError")) {
                // generic error for any other unexpected scenario 
                throw new Error("error connecting to database!")
            }
            const hero = new HeroEntity(parsedData)
            if (!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(hero.notification.join('\n')) // error.message because we've populated the msg with a custom message
                continue; // to continue inside the 'For' above
            }

            // Save into database
            response.writeHead(statusCodes.OK)
            response.end()

        } catch (error) {
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

/*
    curl -i localhost:3000 -X POST --data '{"name": "Avenger", "age": 80}'
*/