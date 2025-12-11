export function modulo(x: number, mod: number): [number, number] {
    let count = 0;
    if (x < 0) {
        count = Math.ceil(-x / mod);
        x += count * mod;
    } else if (x >= mod) {
        count = Math.floor(x / mod);
        x -= count * mod;
    }
    return [x, count];
}