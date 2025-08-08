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

    async caughPokemon(pokemonName: string): Promise<Pokemon> {

        const url = `${this.baseURL}/pokemon/${pokemonName}`;

        const response = await fetch(url);

        this.checkResponse(response);

        return await response.json();
    }

    private async fetchWithCache<T>(url: string): Promise<T> {

        const cacheResult = this.cache.get(url);

        if (
            cacheResult === undefined
        ) {

            const response = await fetch(url);
            this.checkResponse(response);
            this.cache.add(url, await response.json());
        }

        // already ensure that cache exists.
        return this.cache.get(url)!.val as T;
    }

    // TODO:: Add more error handling.
    private checkResponse(response: Response): void {
        if (response.status !== 200) {
            throw Error("Unexcepted request!")
        }
    }
}

type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string,
        url: string,
    }[];
};

export type Pokemon = {
    abilities: Ability[]
    base_experience: number
    cries: Cries
    forms: Form[]
    game_indices: Index[]
    height: number
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Mfe[]
    name: string
    order: number
    past_abilities: PastAbility[]
    past_types: any[]
    species: Species
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
}

type Location = {
    pokemon_encounters: PokemonEncounter[]
};

type PokemonEncounter = {
    pokemon: ShallowPokemon
}

type ShallowPokemon = {
    name: string
    url: string
}

type Ability = {
    ability: Ability2
    is_hidden: boolean
    slot: number
}

type Ability2 = {
    name: string
    url: string
}

type Cries = {
    latest: string
    legacy: string
}

type Form = {
    name: string
    url: string
}

type Index = {
    game_index: number
    version: Version
}

type Version = {
    name: string
    url: string
}

type Mfe = {
    move: Move
    version_group_details: VersionGroupDetail[]
}

type Move = {
    name: string
    url: string
}

type VersionGroupDetail = {
    level_learned_at: number
    move_learn_method: MoveLearnMethod
    order?: number
    version_group: VersionGroup
}

type MoveLearnMethod = {
    name: string
    url: string
}

type VersionGroup = {
    name: string
    url: string
}

type PastAbility = {
    abilities: Ability3[]
    generation: Generation
}

type Ability3 = {
    ability: any
    is_hidden: boolean
    slot: number
}

type Generation = {
    name: string
    url: string
}

type Species = {
    name: string
    url: string
}

type Sprites = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: Other
    versions: Versions
}

type Other = {
    dream_world: DreamWorld
    home: Home
    "official-artwork": OfficialArtwork
    showdown: Showdown
}

type DreamWorld = {
    front_default: string
    front_female: any
}

type Home = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

type OfficialArtwork = {
    front_default: string
    front_shiny: string
}

type Showdown = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

type Versions = {
    "generation-i": GenerationI
    "generation-ii": GenerationIi
    "generation-iii": GenerationIii
    "generation-iv": GenerationIv
    "generation-v": GenerationV
    "generation-vi": GenerationVi
    "generation-vii": GenerationVii
    "generation-viii": GenerationViii
}

type GenerationI = {
    "red-blue": RedBlue
    yellow: Yellow
}

type RedBlue = {
    back_default: string
    back_gray: string
    back_transparent: string
    front_default: string
    front_gray: string
    front_transparent: string
}

type Yellow = {
    back_default: string
    back_gray: string
    back_transparent: string
    front_default: string
    front_gray: string
    front_transparent: string
}

type GenerationIi = {
    crystal: Crystal
    gold: Gold
    silver: Silver
}

type Crystal = {
    back_default: string
    back_shiny: string
    back_shiny_transparent: string
    back_transparent: string
    front_default: string
    front_shiny: string
    front_shiny_transparent: string
    front_transparent: string
}

type Gold = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
    front_transparent: string
}

type Silver = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
    front_transparent: string
}

type GenerationIii = {
    emerald: Emerald
    "firered-leafgreen": FireredLeafgreen
    "ruby-sapphire": RubySapphire
}

type Emerald = {
    front_default: string
    front_shiny: string
}

type FireredLeafgreen = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

type RubySapphire = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

type GenerationIv = {
    "diamond-pearl": DiamondPearl
    "heartgold-soulsilver": HeartgoldSoulsilver
    platinum: Platinum
}

type DiamondPearl = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

type HeartgoldSoulsilver = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

type Platinum = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

type GenerationV = {
    "black-white": BlackWhite
}

export type BlackWhite = {
    animated: Animated
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type Animated = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationVi = {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire
    "x-y": XY
}

export type OmegarubyAlphasapphire = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type XY = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationVii = {
    icons: Icons
    "ultra-sun-ultra-moon": UltraSunUltraMoon
}

export type Icons = {
    front_default: string
    front_female: any
}

export type UltraSunUltraMoon = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationViii = {
    icons: Icons2
}

export type Icons2 = {
    front_default: string
    front_female: any
}

export type Stat = {
    base_stat: number
    effort: number
    stat: Stat2
}

export type Stat2 = {
    name: string
    url: string
}

export type Type = {
    slot: number
    type: Type2
}

export type Type2 = {
    name: string
    url: string
}