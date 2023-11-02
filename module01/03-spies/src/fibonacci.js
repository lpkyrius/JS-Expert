class Fibonacci {
    // iterator method:
    // the * allow to use "yeld". 
    // So, we don't consume memory pushing results to an array 
    // to, finally, return the final result.
    // what may be impossible to do if it demands too many memory
    // like if we have to add 1gb of data in the array
    * execute(input, current = 0, next = 1) {
        // all the sequences done. So, stop!
        if (input === 0) {
            return 
        }
        // returns the value
        yield current

        // delegates function but do not return value
        yield *this.execute(input - 1, next, current + next)

    }
}

module.exports = Fibonacci