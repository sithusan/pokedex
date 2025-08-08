import { State } from "./state.js";

export const commandCatch = async (state: State, ...args: string[]): Promise<void> => {

    const pokemonName = args.at(0);

    if (pokemonName === undefined) {
        throw new Error("Please give the pokemon name.");
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const response = await state.pokeapi.caughPokemon(pokemonName);

    const userChance = Math.floor(Math.random() * 100);

    if (userChance >= response.base_experience) {
        state.pokedex[response.name] = response;
    }
}