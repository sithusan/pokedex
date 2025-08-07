import { stdin, stdout } from "process";
import { createInterface } from "readline";

const io = createInterface({
    input: stdin,
    output: stdin,
    prompt: 'Pokedex > ',
})

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
        console.log(`Your command was: ${cleanedInput.at(0)}`)

        io.prompt();
    });
} 
