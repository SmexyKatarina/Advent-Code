import { readFileSync } from 'fs';
import { Grid } from './lib/Grid';

const day = "04";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

function part1(input: string): number {
    console.time("Part 1 Process Time");
    const grid: Grid = new Grid(input);
    const papers = grid
        .getGrid() // Get Grid
        .flat() // Flatten the array
        .filter(cell => // Filter the cells
            cell.cellValue === "@" && // Filter where it equals a paper
            grid.getAdjacentCells(cell) // And that the adjacent cells to this one
                .filter(y => y.cellValue === "@") // Where the ones that are paper
                .length < 4 // Are totaled to less than 4
        ).length; // And how many of these cells exist with these conditions
    console.timeEnd("Part 1 Process Time");
    return papers;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");
    const grid: Grid = new Grid(input);

    let totalRemoved = 0;

    while (true) {

        // Cells of accessable papers
        const accessablePapers = grid
            .getGrid() // Get Grid
            .flat() // Flatten the array
            .filter(cell => // Filter the cells
                cell.cellValue === "@" && // Filter where it equals a paper
                grid.getAdjacentCells(cell) // And that the adjacent cells to this one
                    .filter(y => y.cellValue === "@") // Where the ones that are paper
                    .length < 4 // Are totaled to less than 4
            );
        // If there is no more accaccessible paper cells, finish.
        if (accessablePapers.length === 0) break;
        // Loop through and change them to empty cells while counting the removed paper
        for (const { position } of accessablePapers) {
            grid.setCell(position.row, position.col, "."); 
            totalRemoved++;
        }
    }

    console.timeEnd("Part 2 Process Time");
    return totalRemoved;
}

//console.log("Part 1 (Test Input):", part1(testInput));
//console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
