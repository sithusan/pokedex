import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export const initState = (): State => {

    const readline = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex > ',
    })

    const commands: Record<string, CLICommand> = {
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

    return {
        readline: readline,
        commands: commands,
    }
}