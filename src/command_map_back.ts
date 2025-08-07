import { State } from "./state.js";

export const commandMapBack = async (state: State): Promise<void> => {

    const response = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;

    for (const location of response.results) {
        console.log(location.name);
    }

    console.log("\n");
}