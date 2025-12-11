import { readFileSync } from 'fs';
import { modulo } from './lib/utils';

const day = "01";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

function part1(input: string): number {
    const lines = input.split('\n');

    let currentPosition = 50;
    let zeros = 0;

    for (let line = 0; line < lines.length; line++) {
        const [negative, amt] = [ lines[line].charAt(0) === 'L', parseInt(lines[line].substring(1)) ];
        if (currentPosition === 0) zeros++;
        currentPosition = modulo(negative ? currentPosition - amt : currentPosition + amt, 100)[0];
    }

    return zeros;
}

function part2(input: string): number {
    const lines = input.split('\n');

    let currentPosition = 50;
    let zeros = 0;

    for (let line = 0; line < lines.length; line++) {

        const [negative, amt] = [ lines[line].charAt(0) === 'L', parseInt(lines[line].substring(1)) ];
        const rawNext = negative ? currentPosition - amt : currentPosition + amt;
        const [result, wraps] = modulo(rawNext, 100);

        console.log(`Current and Next Move: ${currentPosition} ${negative ? `- ${amt}` : `+ ${amt}`} = ${negative ? currentPosition - amt : currentPosition + amt}`);
        console.log(`Next Position: ${result}`);

        let passedZero = 0;
        if (negative && rawNext < 0 && currentPosition !== 0) {
            passedZero = wraps;
        } else if (!negative && rawNext >= 100 && currentPosition !== 99) {
            passedZero = wraps;
        }

        if (rawNext === 0 && currentPosition !== 0) {
            passedZero = 1;
        }

        console.log(`Passed through 0: ${passedZero}`);
        console.log(`\t`);

        zeros += passedZero;
        currentPosition = result;
    }

    return zeros;
}

//console.log("Part 1 (Test Input):", part1(testInput));
console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
//console.log('Part 2:', part2(input));