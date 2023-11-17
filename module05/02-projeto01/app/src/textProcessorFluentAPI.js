// Project Pattern Fluent API
// the Fluent API Pattern goal is to execute tasks as in a
// pipeline, step by step, and finally, calls build, which 
// is pretty similar to Builder Pattern
// The difference is regarding processes, the Builder is about
// Objects building and Fluent API is chain, calling several methods
class TextProcessorFluentAPI {
    // the property will be private
    #content
    constructor(content) {
        this.#content = content; // the entire file string past through this constructor
    }
    extractPeopleData() {
        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi;
        const onlyPerson = this.#content.match(matchPerson);
        // console.log('onlyPerson', onlyPerson);
        // console.log('onlyPerson match', matchPerson.test(this.#content));
        this.#content = onlyPerson;
        
        return this;
    }
    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;