class Database {
    constructor({ connectionString }) {
        this.connectionString = connectionString;
    }

    // to make it looks like a real database
    async sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        })
    }

    async connect() {
        await this.sleep(100);
        return this;
    }

    async find(query) {
        await this.sleep(100);
        return [{ name: 'LeandroPassos' }]
    }
}

module.exports = Database;