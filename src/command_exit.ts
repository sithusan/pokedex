import { exit } from "process";

export const commandExit = () => {
    console.log("Closing the Pokedex... Goodbye!");
    exit(0);
} 