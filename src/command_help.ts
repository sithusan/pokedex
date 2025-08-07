import { CLICommand } from "./repl";

export const commandHelp = (commands: Record<string, CLICommand>) => {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("\n");

    for (const commandKey in commands) {
        const command = commands[commandKey]

        console.log(`${command.name}: ${command.description}`);
    }

    console.log("\n");
}