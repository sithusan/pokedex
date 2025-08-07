import { State } from "./state.js";

export const commandHelp = (state: State) => {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("\n");

    const commands = state.commands;

    for (const commandKey in commands) {
        const command = commands[commandKey]

        console.log(`${command.name}: ${command.description}`);
    }

    console.log("\n");
}