export const cleanInput =
    (input: string): string[] => input.toLocaleLowerCase()
        .split(" ")
        .filter((word: string) => word.length > 0);
