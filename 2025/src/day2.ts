import { readFileSync } from 'fs';
import { getUniqueArray, isUniqueArray } from './lib/utils';
import { timeLog } from 'console';

const day = "02";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

/*

Given ranges of IDs.

First and Last separated by - and per range separated by ,

Looking for INVALID:
-> Sequence of numbers repeated ONLY twice (55, 6464, 123123)
-> The whole number has to be made of these repeated numbers. (998 -> Valid, 1188511885 -> Invalid)
-> No leading zeroes (0101 does not exist)

Find all INVALID ids and sum them up for the answer.


11-22,
95-115,
998-1012,
1188511880-1188511890,
222220-222224,
1698522-1698528,
446443-446449,
38593856-38593862,
565653-565659,
824824821-824824827,
2121212118-2121212124

Part 2:

Given ranges of IDs.

First and Last separated by - and per range separated by ,

Looking for INVALID:
-> Sequence of numbers repeated more than once (55, 6464, 123123, 111, 222222, 121212121212121212)
-> The whole number has to be made of these repeated numbers. (998 -> Valid, 1188511885 -> Invalid)
-> No leading zeroes (0101 does not exist)

Find all INVALID ids and sum them up for the answer.



*/

function part1(input: string): number {
    const lines = input.split(',');

    let sum = 0;

    for (let range = 0; range < lines.length; range++) {
        const [start, end] = lines[range].split("-").map(x => parseInt(x));

        for (let curr = start; curr <= end; curr++) {
            const currStr = curr.toString();
            if (currStr.length % 2 === 0) {
                const [firstHalf, secondHalf] = [currStr.substring(0, (currStr.length / 2)), currStr.substring(currStr.length / 2)]
                if (firstHalf === secondHalf) sum += curr;
            }
        }

    }

    return sum;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");
    const lines = input.split(',').map(x => x.split("-").map(Number));
    let sum = 0;
    for (const range of lines) {
        const [start, end] = range;
        for (let curr = start; curr <= end; curr++) {
            const currStr = curr.toString();
            const uniqueLength = getUniqueArray([...currStr]).length;
            // If the whole string of digits is unique, then it cant have repeating numbers
            if (uniqueLength === currStr.length) continue;
            // Check if the unique array is equal to 1, meaning only one digit is in the string.
            if (uniqueLength === 1) {
                sum += curr;
                continue;
            }
            // Find sequences of duplicate numbers
            const matches = [...currStr.matchAll(/\b(\d+)\1+\b/g)];
            // If the total length of these duplicate sequence matches equal the length of the string, add the number
            if (matches.length > 0 && matches
                .reduce((acc, [value, pattern]) =>
                    acc + ((value.length % pattern.length !== 0) ||
                        (value !== pattern.repeat(value.length / pattern.length)) ?
                        0 : value.length)
                    , 0) === currStr.length) {
                //console.log(`Total length of the matches is equal to the length of the string, adding number: ${curr}`);
                sum += curr;
                //console.log(`New Sum: ${sum}\n`);
            }
        }
    }
    console.timeEnd("Part 2 Process Time");
    return sum;
}

//console.log("Part 1 (Test Input):", part1(testInput));
//console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));