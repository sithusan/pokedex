import { stdin, stdout } from "process";
import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

const io = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
})

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}

export const getCommands = (): Record<string, CLICommand> => {
    return {
        exit: {
            name: "exit",
            description: "Exists the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
    }
}

export const cleanInput =
    (input: string): string[] => input.toLocaleLowerCase()
        .split(" ")
        .filter((word: string) => word.length > 0);

export const startREPL = () => {
    io.prompt();
    io.on("line", (input: string) => {

        if (input.length === 0) {
            io.prompt();
            return;
        }

        const cleanedInput = cleanInput(input);
        const availableCommands = getCommands();

        const requestedCommand = availableCommands[cleanedInput.at(0)!]; // There is length check already.

        if (requestedCommand === undefined) {
            console.log('Unknown command');
            io.prompt();
            return;
        }

        requestedCommand.callback(availableCommands);

        io.prompt();
    });
} 
