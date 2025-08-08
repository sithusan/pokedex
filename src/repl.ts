import { State } from "./state.js";

export const cleanInput = (input: string): string[] =>
  input
    .toLocaleLowerCase()
    .split(" ")
    .filter((word: string) => word.length > 0);

export const startREPL = (state: State) => {
  state.readline.prompt();

  state.readline.on("line", async (input: string) => {
    if (input.length === 0) {
      state.readline.prompt();
      return;
    }

    const cleanedInput = cleanInput(input);

    const requestedCommand = state.commands[cleanedInput.shift()!]; // There is length check already.

    if (requestedCommand === undefined) {
      console.log("Unknown command");
      state.readline.prompt();
      return;
    }

    try {
      await requestedCommand.callback(state, ...cleanedInput);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }

    state.readline.prompt();
  });
};
