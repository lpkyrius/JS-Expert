import { createServer } from 'http'
import { parse, fileURLToPath } from 'url'
import { Worker } from 'worker_threads'

// due to an issue with sharp
import sharp from 'sharp'

import { dirname, resolve } from 'path'

const currentFolder = dirname(fileURLToPath(import.meta.url))
const workerFileName = 'worker.js'

async function joinImages(images) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workerFileName}`)
        worker.postMessage(images)
        worker.once('message', resolve)
        worker.once('error', reject)
        worker.once('exit', code => {
            if(code !== 0) {
                return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`))
            }
          
            console.log(`the thread ${worker.threadId} exited!`)
        })
    })

}

async function handler(request, response) {
    if(request.url.includes('joinImages')) {
        const { query: { background, img }} = parse(request.url, true)
        const response = await joinImages({ 
            image: img,
            background
        })
        console.log({ background, img })
        response.end('hello')
        return;
    }

    return response.end('ok')
}

createServer(handler)
    .listen(3000, () => console.log('running at 3000'))

// localhost:3000/joinImages?img=https://images.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png&background=https://wallpapers.com/images/hd/post-apocalyptic-2qaak8am8soyjqvw.jpg

// https://images.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png
// https://images.tcdn.com.br/img/img_prod/460977/boneco_samurai_predador_samurai_predator_alien_vs_predador_alien_vs_predator_escala_1_6_ac01_hot_toy_40177_1_20201211160146.png

//  backgrounds
// https://wallpapers.com/images/hd/post-apocalyptic-2qaak8am8soyjqvw.jpg
// https://i.redd.it/skodeu3osgvx.jpg
