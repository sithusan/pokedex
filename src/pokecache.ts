type CacheEntry<T> = {
    createdAt: number;
    val: T
}

export class Cache {

    private cache = new Map<string, CacheEntry<any>>();

    private reapIntervalId: NodeJS.Timeout | undefined = undefined;

    private interval: number;

    constructor(interval: number) {
        this.interval = interval;
        this.startReapLoop();
    }

    stopReapLoop(): void {
        clearInterval(this.reapIntervalId);
        this.reapIntervalId = undefined;
    }

    add<T>(key: string, val: T): void {
        this.cache.set(key, {
            createdAt: Date.now(),
            val: val
        });
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        return this.cache.get(key);
    }

    private reap(): void {
        this.cache.forEach((val: CacheEntry<any>, key: string) => {
            if (val.createdAt < Date.now() - this.interval) {
                this.cache.delete(key);
            }
        })
    }

    private startReapLoop(): void {
        this.reapIntervalId = setInterval(() => {
            this.reap();
        }, this.interval);
    }
}