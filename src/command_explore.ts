import { State } from "./state.js";

export const commandExplore = async (
  state: State,
  ...args: string[]
): Promise<void> => {
  const locationName = args.at(0);

  if (locationName === undefined) {
    throw new Error("Please give the location name.");
  }

  const response = await state.pokeapi.fetchLocation(locationName);

  console.log(`Exploring ${locationName}...`);
  console.log("Found Pokemon:");

  for (const pokemonEncounter of response.pokemon_encounters) {
    console.log(`- ${pokemonEncounter.pokemon.name}`);
  }

  console.log("\n");
};
