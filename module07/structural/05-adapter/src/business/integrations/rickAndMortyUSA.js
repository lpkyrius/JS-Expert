import axios from 'axios'
import { parseStringPromise } from 'xml2js'
import Character from '../../entities/character.js'

const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml'

export default class RickAndMortyUSA {
    static async getCharactersFromXML() {
        const { data } = await axios.get(URL)
        const options = {
            explicitRoot: false, // to ignore <root>
            explicitArray: false // by default it'd return an array, false makes it returns an object
        }

        // it will return results, inside it element which we'll use a nickname results being an empty array by default here
        // 1st results comes from destructure
        // 2nd results is the nickname we gave to element
        const { results: { element : results = [] }} = await parseStringPromise(data, options)
        // let's set it in order to return an empty object instead of an empty array when it has an empty array
        const defaultFormat = Array.isArray(results) ? results : [results] // results nicknamed
        return defaultFormat.map(data => new Character(data))
    }
}