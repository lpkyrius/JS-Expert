// Customized error 

const safeRegex = require('safe-regex');
class InvalidRegexError extends Error {
    constructor(exp) {
        super(`This ${exp} is unsafe, dude!`);
        // overwrite the name to do not get from base class but let us know it was from this class
        this.name = "InvalidRegexError";
    }
}

const evaluateRegex = (exp) => {
    const isSafe = safeRegex(exp);
    if(isSafe) return exp;

    throw new InvalidRegexError(exp);
}

module.exports = { evaluateRegex, InvalidRegexError };