import { State } from "./state.js";

export const commandInspect = async (state: State, ...args: string[]): Promise<void> => {

    const pokemonName = args.at(0);

    if (pokemonName === undefined) {
        throw new Error("Please give the pokemon name.");
    }

    const pokemon = state.pokedex[pokemonName];

    if (pokemon === undefined) {
        console.log("you have not caught that pokemon");
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);

    console.log('Stats:');

    for (const stat of pokemon.stats) {
        console.log(`-${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log("Types:");

    for (const type of pokemon.types) {
        console.log(`- ${type.type.name}`);
    }
}