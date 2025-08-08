import { State } from "./state.js";

export const commandPokedex = async ({ pokedex }: State): Promise<void> => {
  if (Object.keys(pokedex).length === 0) {
    console.log("You haven't caught any pokemon");
    return;
  }

  console.log("Your Pokedex:");

  for (const pokemonKey in pokedex) {
    console.log(`- ${pokedex[pokemonKey].name}`);
  }
};
