import { readFileSync } from 'fs';
import { isInRange } from './lib/utils';

const day = "05";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

function part1(input: string): number {
    console.time("Part 1 Process Time");

    const [rangeSplit, idSplit] = input.split('\r\n\r\n');

    const ids = idSplit.split("\n").map(Number);
    const ranges = rangeSplit.split("\n")
    .map(line => {
        const [min, max] = line.split("-").map(Number);
        return { min, max };
    })
    
    console.timeEnd("Part 1 Process Time");
    return ids.filter(id => ranges.some(({ min, max }) => isInRange(id, min, max))).length;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");
    const [rangeSplit] = input.split('\r\n\r\n');

    const ranges = rangeSplit.split("\n").map(line => {
        const [min, max] = line.split("-").map(Number);
        return { min, max };
    }).sort((a, b) => a.min - b.min);

    const selectedRanges: { min: number, max: number }[] = [];

    for (let i = 0; i < ranges.length; i++) {
        const currRange = selectedRanges[selectedRanges.length - 1];
        const nextRange = ranges[i];

        if (currRange !== undefined && isInRange(nextRange.min, currRange.min, currRange.max)) {
            currRange.max = Math.max(currRange.max, nextRange.max);
        } else {
            selectedRanges.push(nextRange);
        }

    }

    const sum = selectedRanges.reduce((acc, cur) => {
        return acc + (cur.max - cur.min + 1)
    }, 0)

    console.timeEnd("Part 2 Process Time");
    return sum;
}

//console.log("Part 1 (Test Input):", part1(testInput));
//console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));