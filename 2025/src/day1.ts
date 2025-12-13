import { readFileSync } from 'fs';
import { modulo } from './lib/utils';

const day = "01";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

/*

Dial from 0 - 99. Turning it and landing on a number results in a "click" (which means it counts as being "passed through")
If on Position 0 and turning towards the lower numbers (L), go to 99.
If on Position 99 and turning towards the higher numbers (R), go to 0.
Always start on Position 50

Moves are given per line as: L# or R#
Where # is any number

=========

Part 1:

How many times does the dial STOP on zero AFTER a rotation.

Position 50:
L50 -> Position 0 (counts as +1 zero)

Position 50:
L51 -> Position 99 (counts as no zeroes)

Example:

L68
L30
R48
L5
R60
L55
L1
L99
R14
L82

The dial starts by pointing at 50.
The dial is rotated L68 to point at 82.
The dial is rotated L30 to point at 52.
The dial is rotated R48 to point at 0. -> 1
The dial is rotated L5 to point at 95.
The dial is rotated R60 to point at 55.
The dial is rotated L55 to point at 0. -> 2
The dial is rotated L1 to point at 99.
The dial is rotated L99 to point at 0. -> 3
The dial is rotated R14 to point at 14.
The dial is rotated L82 to point at 32.

Because the dial points at 0 a total of three times during this process, the password in this example is 3.

===

Part 2:

Instead of landing on zero. The dial now has to "pass through" zero. So, at any point that it "clicks" onto zero at ANY point, counts as a zero.

This will count even for higher moves that loop (Ex. R200 -> Would count as 2 zeroes)
[Be careful: if the dial were pointing at 50, a single rotation like R1000 would cause the dial to point at 0 ten times before returning back to 50!]

Starting on a zero does not count after it moves off.
Stopping on a zero still counts.

Example

L68
L30
R48
L5
R60
L55
L1
L99
R14
L82

The dial starts by pointing at 50.
The dial is rotated L68 to point at 82; during this rotation, it points at 0 once. -> 1
The dial is rotated L30 to point at 52.
The dial is rotated R48 to point at 0. -> 2
The dial is rotated L5 to point at 95. -> See how this doesn't count as 3 because it started on 0
The dial is rotated R60 to point at 55; during this rotation, it points at 0 once. -> 3
The dial is rotated L55 to point at 0. -> 4
The dial is rotated L1 to point at 99.
The dial is rotated L99 to point at 0. -> 5
The dial is rotated R14 to point at 14.
The dial is rotated L82 to point at 32; during this rotation, it points at 0 once. -> 6

In this example, the dial points at 0 three times at the end of a rotation, plus three more times during a rotation. So, in this example, the new password would be 6.

*/

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
        const [isLeft, amt] = [lines[line].charAt(0) === 'L', parseInt(lines[line].substring(1))];
        let timesPassingZero = 0;
        if (isLeft) {
            if (currentPosition === 0) {
                timesPassingZero = Math.floor(amt / 100);
            } else {
                if (amt >= currentPosition) {
                    timesPassingZero = 1 + Math.floor((amt - currentPosition) / 100);
                }
            }
        } else {
            const distanceToZero = 100 - currentPosition;
            if (amt >= distanceToZero) {
                timesPassingZero = 1 + Math.floor((amt - distanceToZero) / 100);
            }
        }
        currentPosition = modulo(isLeft ? currentPosition - amt : currentPosition + amt, 100)[0];
        zeros += timesPassingZero;
    }

    return zeros;
}

//console.log("Part 1 (Test Input):", part1(testInput));
//console.log("Part 2 (Test Input):", part2(testInput));
console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));