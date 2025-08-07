export class PokeAPI {

    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {

        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

        const response = await fetch(url);

        return response.json();
    }

    async fetchLocation(locationName: string): Promise<Location> {

        const url = `${PokeAPI.baseURL}/${locationName}`;

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