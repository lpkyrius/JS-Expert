# Factories

Factories are used to build instances decopling complexity and avoiding code replications

## Dependency Injection

```javascript

Database

connection()

UserRepository

list()

create()

UserService

list()

Factory

dbConnection = await Database().connect()

userRepository = new UserRepository({ dbConnection })

userService = new UserService({ userRepository })

return userService

```

## Family of Objects

```javascript

class ClienteDTO {}

class ClienteFisicoDTO extends ClienteDTO {}

class ClienteJuridicoDTO extends ClienteDTO {}

Factory

if (tipoCliente === 1)

return new ClienteFisicoDTO();

return new ClienteJuridicoDTO();

```

```javascript

class SerializerFactory {

function getSerializer(self, format){

if (format === 'JSON')

return JsonSerializer()

else (format === 'XML')

return XmlSerializer()

return null

}

}

```

## Functional & Currying

Currying is a feature of many functional languages. Named after mathematician Haskell Curry (for whom the Haskell programming language is also named), currying transforms a multiargument function so that it can be called as a chain of single-argument functions.

```js

const dividesBy =

(baseNumber) =>

(currentValue) =>

((currentValue % baseNumber) === 0)

// using!

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(nums.filter(dividesBy(2)))

console.log(nums.filter(dividesBy(3)))

```