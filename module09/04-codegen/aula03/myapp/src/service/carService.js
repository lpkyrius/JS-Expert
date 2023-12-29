
export default class CarService {
    constructor({ repository: carRepository }){
        this.carRepository = carRepository
    }

    create(data) {
        return this.carRepository.create(data)
    }

    read(query) {
        return this.carRepository.read(query)
    }

    update(id, data) {
        return this.carRepository.update(id, data)
    }

    delete(id) {
        return this.carRepository.delete(id)
    }
}