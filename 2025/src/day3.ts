import { readFileSync } from 'fs';

const day = "03";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

type Battery = {
    joltage: number,
    index: number
}

function part1(input: string): number {
    console.time("Part 1 Process Time");
    const packs: Battery[][] = input.split("\n").map(x => x.trim().split("").map((y, index) => ({ joltage: parseInt(y), index })));

    let sum = 0;

    for (const pack of packs) {
        const sorted: Battery[] = pack.sort((a, b) => b.joltage - a.joltage);
        for (let highestJoltage = 9; highestJoltage > 0; highestJoltage--) {
            const highJoltage = sorted.find(x => x.joltage === highestJoltage);
            if (!highJoltage) continue;
            let lowJoltage;
            for (let nextJoltage = 9; nextJoltage > 0; nextJoltage--) {
                lowJoltage = sorted.find(x => x.joltage === nextJoltage && x.index > highJoltage.index);
                if (typeof lowJoltage !== "undefined") break;
            }
            if (!lowJoltage) continue;
            sum += parseInt(`${highJoltage.joltage}${lowJoltage.joltage}`);
            break;
        }
    }

    console.timeEnd("Part 1 Process Time");
    return sum;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");
    const packs: Battery[][] = input.split("\n").map(x => x.trim().split("").map((y, index) => ({ joltage: parseInt(y), index })));

    let sum = 0;

    for (const pack of packs) {
        const batteries: Battery[] = [];
        for (let remaining = 11; remaining >= 0; remaining--) {
            // The max index the window can search to, exclusive.
            const maxIndex = pack.length - remaining;
            // Check if a previous added battery exists
            const prevBattery = batteries.at(-1);
            if (12 - batteries.length === remaining) {
                batteries.push(...pack.slice(prevBattery ? prevBattery.index + 1 : 0));
                break;
            }
            // Make range
            const [start, end] = prevBattery ? [prevBattery.index + 1, maxIndex - 1] : [0, maxIndex - 1];
            // Add highest from the range
            let maxBattery = pack[start];
            for (let i = start + 1; i <= end; i++) {
                if (pack[i].joltage > maxBattery.joltage) {
                    maxBattery = pack[i];
                }
            }
            batteries.push(maxBattery);
        }
        sum += parseInt(batteries.map(x => x.joltage.toString()).join(""));
    }

    console.timeEnd("Part 2 Process Time");
    return sum;
}

//console.log("Part 1 (Test Input):", part1(testInput));
// console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));