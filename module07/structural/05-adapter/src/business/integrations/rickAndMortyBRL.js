import axios from 'axios'
import Character from '../../entities/character.js'
// const URL = ''
const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.json'

export default class RickAndMortyBRL {
    static async getCharactersFromJSON() {
        // checking axios docs we know it returns an object 'data'
        // let's provide a default value for results with 'results = []'
        // because it may be empty (like in characters-empty.json)
        // avoiding an undefined result
        const { data: { results = [] } } = await axios.get(URL)
        return results.map(data => new Character(data))

    }
}