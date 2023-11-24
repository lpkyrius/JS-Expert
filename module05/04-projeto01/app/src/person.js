const { evaluateRegex } = require('./util');
class Person {
    // nome: "Xuxa da Silva",
    // nacionalidade: "Brasileira",
    // estadoCivil: "Casada",
    // documento: "23574342012",
    // rua: "Rua dos bobos",
    // numero: "zero",
    // bairro: "Alphaville",
    // estado: "São Paulo"
    // searching for (\w):\s.*
    // replacing with $1,
    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        documento,
        rua,
        numero,
        bairro,
        estado,
    ]) {
        
        // ^ -> since the very beginning 
        // + -> one or more occurrences
        // (\w{1}) -> get only the 1st letter and leave it in a group
        // [a-zA-Z] -> find uppercase and lowercase letters, we add the '+' to get all letter until the end of row (special character)
        // g -> to search for all occurrences
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/);
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`;
            })
        }
        
        // then, for nome, ...
        // search: (\w+),
        // replace: this.$1 = $1
        this.nome = nome;
        this.nacionalidade = formatFirstLetter(nacionalidade);
        this.estadoCivil = formatFirstLetter(estadoCivil);
        // everything unlike digit switches to empty ""
        // /g removes all the occurrences found
        this.documento = documento.replace(evaluateRegex(/\D/g), "");
        // searches space+a+space ' a ' and gets everything after it
        // (?<= -> ignores everything before the ' a '
        // known as positive lookBehind
        // match returns an array, that's why we use .join() here
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
        this.numero = numero;
        // searches right after the space 'bairro ' getting everything else until the end (it could be .* as well)
        // this.bairro = bairro.match(evaluateRegex(/(?<=\s)\w+$/)).join();
        this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
        // removes the '.' at the end of the text
        this.estado = estado.replace(evaluateRegex(/\./), "");
    }
}

module.exports = Person;