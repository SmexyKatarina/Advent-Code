import { readFileSync } from 'fs';

const day = "06";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

function part1(input: string): number {
    console.time("Part 1 Process Time");
    const lines = input.split('\r\n');
    const numbers = lines.slice(0, -1).map(line => line.trim().split(/\s+/).map(Number));
    const operators = lines[lines.length - 1].trim().split(/\s+/);

    let sum = 0;

    for (let i = 0; i < operators.length; i++) {
        const op = operators[i];
        sum += numbers.map(x => x[i]).reduce((acc, curr) => {
            return op === '+' ? acc + curr : acc * curr;
        });
    }

    console.timeEnd("Part 1 Process Time");
    return sum;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");
    const lines = input.split('\r\n');
    const operators = lines[lines.length - 1].trim().split(/\s+/).reverse();
    const numbers = lines.slice(0, -1).map(x => [...x].reverse().join(""));
    
    let arr = [];

    let sum = 0;
    let problem = 0;

    for (let i = 0; i <= Math.max(...numbers.map(x => x.length)); i++) {
        const col = parseInt(numbers.map(x => x[i]).join(""));
        if (col) {
            arr.push(col);
        } else {
            const op = operators[problem];
            sum += arr.reduce((acc, curr) => {
                return op === "+" ? acc + curr : acc * curr;
            }, op === "+" ? 0 : 1);
            arr = [];
            problem++;
        }
    }
    console.timeEnd("Part 2 Process Time");
    return sum;
}

//console.log("Part 1 (Test Input):", part1(testInput));
console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));