import { Cache } from "./pokecache.js";

export class PokeAPI {

    private cacheInterval = 360000 // 6 mins 

    private cache: Cache;

    private readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {
        this.cache = new Cache(
            this.cacheInterval
        );
    }

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {

        const url = pageURL ?? `${this.baseURL}/location-area`;

        return this.fetchWithCache<ShallowLocations>(url);
    }

    async fetchLocation(locationName: string): Promise<Location> {

        const url = `${this.baseURL}/location-area/${locationName}`;

        return this.fetchWithCache<Location>(url);
    }

    private async fetchWithCache<T>(url: string): Promise<T> {

        const cacheResult = this.cache.get(url);

        if (
            cacheResult === undefined
        ) {

            const response = await fetch(url);
            this.cache.add(url, await response.json());
        }

        // already ensure that cache exists.
        return this.cache.get(url)!.val as T;
    }

}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string,
        url: string,
    }[];
};

export type Location = {
    pokemon_encounters: PokemonEncounter[]
};

type PokemonEncounter = {
    pokemon: Pokemon
    // version_details: VersionDetail[]
}

type Pokemon = {
    name: string
    url: string
}

// type VersionDetail {
//     encounter_details: EncounterDetail[]
//     max_chance: number
//     version: Version
// }

// type EncounterDetail {
//     chance: number
//     condition_values: any[]
//     max_level: number
//     method: Method
//     min_level: number
// }

// type Method {
//     name: string
//     url: string
// }

// type Version {
//     name: string
//     url: string
// }