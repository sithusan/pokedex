import { State } from "./state.js";

export const cleanInput =
    (input: string): string[] => input.toLocaleLowerCase()
        .split(" ")
        .filter((word: string) => word.length > 0);

export const startREPL = (state: State) => {
    state.readline.prompt();

    state.readline.on("line", (input: string) => {

        if (input.length === 0) {
            state.readline.prompt();
            return;
        }

        const cleanedInput = cleanInput(input);

        const requestedCommand = state.commands[cleanedInput.at(0)!]; // There is length check already.

        if (requestedCommand === undefined) {
            console.log('Unknown command');
            state.readline.prompt();
            return;
        }

        requestedCommand.callback(state);

        state.readline.prompt();
    });
} 
