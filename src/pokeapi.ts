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

        const cacheResult = this.cache.get(url);

        if (
            cacheResult === undefined
        ) {

            const response = await fetch(url);
            this.cache.add(url, await response.json());
        }

        // already ensure that cache exists.
        return this.cache.get(url)!.val as ShallowLocations;
    }

    async fetchLocation(locationName: string): Promise<Location> {

        const url = `${this.baseURL}/${locationName}`;

        const response = await fetch(url);

        return response.json();
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
    // add properties here
};