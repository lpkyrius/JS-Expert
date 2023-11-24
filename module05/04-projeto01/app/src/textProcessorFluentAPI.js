const { evaluateRegex } = require('./util');
const Person = require('./person');

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
        
        // ---- regex:
        // ?<= -> get all text after this group
        // [contratante|contratada] -> get one or other, but it worked because we have the final 'i' flag (case Insensitive match)
        // :\s{1} -> to search and filter only what has this character ':' followed by an space
        // we keep all of this above between () to get the all the text right after it

        // (?!s) -> negative look around, to ignore the 'contratantes' at the botton since they have more than only space after them
        // .*\n -> to get everything until the first break row \n
        // .*? -> non greety, this '?' makes it stops in the 1st special character like \n or a '.', avoiding loop

        // $ -> to stop the search at the end of the row. (similar to ^ which we use to search from the 1st row column.)
        // g -> global (entire text)
        // m -> multiline (more than one row)
        // i -> insensitive (case insensitive)

        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi);

        // match to find the entire string containing the data we're looking for, and return them as an array
        const onlyPerson = this.#content.match(matchPerson);

        // console.log('onlyPerson', onlyPerson);
        // console.log('onlyPerson match', matchPerson.test(this.#content));
        
        this.#content = onlyPerson;

        return this;
    }
    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/);
        this.#content = this.#content.map(line => line.split(splitRegex));

        return this;
    }
    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this;
    }
    mapPerson() {
        // the items array is sent in the constructor
        this.#content = this.#content.map(line => new Person(line));
        return this;
    }
    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;