// the goal of Facade is to abstract the execution
// extractPeopleData > remove spaces > remove . > mapPerson > and finally: return the instance
// So we call Facade and it calls the pipeline
const TextProcessorFluentAPI = require('./textProcessorFluentAPI');

class TextProcessorFacade{
    #textProcessorFluentAPI
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
                        .extractPeopleData()
                        .divideTextInColumns()
                        .removeEmptyCharacters()
                        .mapPerson()
                        .build()
    }
}

module.exports = TextProcessorFacade;