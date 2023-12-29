
export default class CloatheService {
    constructor({ repository: cloatheRepository }){
        this.cloatheRepository = cloatheRepository
    }

    create(data) {
        return this.cloatheRepository.create(data)
    }

    read(query) {
        return this.cloatheRepository.read(query)
    }

    update(id, data) {
        return this.cloatheRepository.update(id, data)
    }

    delete(id) {
        return this.cloatheRepository.delete(id)
    }
}