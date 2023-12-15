import { NotImplementedException } from "../../util/exceptions.js";

NotImplementedException
export default class BaseBusiness {
    // we use _name because these methods are protected and they
    // will be implemented by the children. The children will not 
    // create new create(data), but only these 2 methods with _
    // will be implemented there.
    _validateRequiredFields(data) {
        throw new NotImplementedException(
            this._validateRequiredFields.name
        )
    }

    _create(data) {
        throw new NotImplementedException(
            this._create.name
        )
    }
    /*
    Martin Fowler pattern
    Proposes to assure the method flow by defining 
    a sequence to be executed.

    This create is the effective implementation of the 
    Template Method
    */
    create(data) {
        const isValid = this._validateRequiredFields(data);
        if (!isValid) throw new Error(`invalid data!`);

        return this._create(data);
    }
}