class UserRepository {
    constructor({ dbConnection }) {
        this.dbConnection = dbConnection;
    } 
    // even not using await it's good to keep the async to remember it's an asynchronous function
    async find(query) {
        return this.dbConnection.find(query);
    }
}

module.exports = UserRepository;