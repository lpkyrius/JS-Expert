
import CarService from '../service/carService.js'
import CarRepository from '../repository/carRepository.js'

export default class CarFactory {
    static getInstance() {
        const repository = new CarRepository()
        const service = new CarService({ repository })

        return service
    }
}