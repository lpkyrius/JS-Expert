import fsPromises from 'fs/promises'
import fs from 'fs'
export async function createLayersIfNotExists({ mainPath, defaultMainFolder, layers }) {

    const defaultPath = `${mainPath}/${defaultMainFolder}`
    const foldersToCreate = layers.filter(layer => !fs.existsSync(layer))
    const results = foldersToCreate
        // we can create folders and sub folders with  mkdir -p pasta1/subpasta2/ 
        // let's do the same with Node using the flag { recursive: } to create the entire tree
        .map(folder => fsPromises.mkdir(`${defaultPath}/${folder}`, { recursive: true }))

    return Promise.all(results)

}