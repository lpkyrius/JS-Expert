import { database } from "../shared/data.mjs";

class Application {
    constructor(factory) {
        this.table = factory.createTable()
    }

    initialize(database) {
        this.table.render(database)
    }
}


; (async function main() {
    // getting the platform to use dynamic import of JS
    const path = globalThis.window ? 'browser' : 'console'
    // since each one uses export default class ... extends ViewFactory
    // default -> no name defined, exports the object directly (ViewFactory)
    // so, let's grab the result form default and give it the nickname ViewFactory
    const { default: ViewFactory } = await import(`./../platforms/${path}/index.mjs`)
    const app = new Application(new ViewFactory())
    app.initialize(database)
})();