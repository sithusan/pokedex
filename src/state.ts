import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapBack } from "./command_map_back.js";
import { commandExplore } from "./command_explore.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
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
        },
        map: {
            name: "map",
            description: "Displays maps",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays previous maps",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Explore in given location",
            callback: commandExplore
        }
    }

    const pokeapi = new PokeAPI();

    return {
        readline: readline,
        commands: commands,
        pokeapi: pokeapi,
        nextLocationsURL: null,
        prevLocationsURL: null
    }
}