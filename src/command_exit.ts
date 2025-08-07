import { State } from "./state.js";
import { exit } from "process";

export const commandExit = (state: State) => {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    exit(0);
} 