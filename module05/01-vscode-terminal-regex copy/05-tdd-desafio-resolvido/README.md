# Resoluçao do Desafio

## Proposta

Crie a camada de apresentação usando o módulo HTTP. Ou seja, você pode criar as rotas, assim como fizemos no módulo de testes end-to-end, e em seguida testá-las usando o supertest.

## Explicação da resolução

- Instalei o `supertest` com `npm i -D supertest@6`
- Rodei o projeto com `npm test`
- Criei uma pasta em [test/e2e](test/e2e) e adicionei o [test/e2e/api.test.js](test/e2e/api.test.js)
- Importei os mocks igual fizemos em [test/unitTests/carService.test.js](test/unitTests/carService.test.js)
- Criei o describe geral, o beforeEach e afterEach para setup do projeto
- Criei a estrutura base do [src/api.js](src/api.js)
  - Nessa estrutura adicionei uma [factory default](src/api.js#7) para que a API seja testável
  - Deixei somente a roda default como inicial
  - Criei a funcao `handler`
  - Criei a funcao `initialize`
  - Adicionei o `if` para ambiente de teste e adicionei o `NODE_ENV` no `package.json` para diferenciar quando estivermos em dev e testes
  - Exportei o código no `module.exports` 

- De volta ao [test/e2e/api.test.js](test/e2e/api.test.js)
  - Criei o before, adicionando as dependencias e inicializacao da API
  - Criei o caso de teste completo para a rota `calculateFinalPrice:post`
- De volta ao [src/api.js](src/api.js) adicionei a rota para o `calculateFinalPrice`

Seguindo o mesmo fluxo, implementei o resto das rotas.

------
IMPORTANTE: Não se preocupe em conquistar 100% de cobertura de código neste momento. O objetivo é que você entenda como criar classes testáveis usando o padrão end2end e offline.

## Autor

- [Erick Wendel](https://twitter.com/erickwendel_)
