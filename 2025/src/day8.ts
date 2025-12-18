import { readFileSync } from 'fs';
import { Vector3 } from './lib/Vector3';

const day = "08";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

function part1(input: string): number {
    console.time("Part 1 Process Time");
    const boxPositions = input.split('\n').map(x => x.split(",").map(Number)).map(([x, y, z]) => new Vector3(x, y, z));

    boxPositions.forEach(x => x.print());

    console.timeEnd("Part 1 Process Time");
    return 0;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");
    const boxPositions = input.split('\n').map(x => x.split(",").map(Number)).map(([x, y, z]) => new Vector3(x, y, z));



    console.timeEnd("Part 2 Process Time");
    return 0;
}

console.log("Part 1 (Test Input):", part1(testInput));
//console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
//console.log('Part 2:', part2(input));