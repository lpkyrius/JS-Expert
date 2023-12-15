class NotImplementedException extends Error {
    constructor(message) {
        super(`${message} as called without an implementation`)

        // It will not have the the Error class name, but its own name
        this.name = "NotImplementedException"
    }
}

export { NotImplementedException }