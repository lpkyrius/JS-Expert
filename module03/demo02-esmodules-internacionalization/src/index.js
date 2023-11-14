import database from './../database.json';
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANGUAGE = 'pt-BR';
// const DEFAULT_LANGUAGE = 'es';
// const DEFAULT_LANGUAGE = 'rus';
// const DEFAULT_LANGUAGE = 'en';

const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);
import { save } from './repository.js';

async function mainLoop() {
    try {
        const answer = await terminalController.question();
        if (answer === STOP_TERM) {
            terminalController.closeTerminal();
            console.log('process finished!');
            return;
        }
        const person = Person.generateInstanceFromString(answer); 
        // Console Input Example: 2 Bike,Airplane,Ship 1000000 2000-01-01 2023-02-02
        // console.log("person", person.formatted(DEFAULT_LANGUAGE));
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));
        await save(person);
        return mainLoop();
        
    } catch (error) {
        console.log('Opps!', error);
        return mainLoop();
    }
}

await mainLoop();