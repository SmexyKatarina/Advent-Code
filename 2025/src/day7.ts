import { readFileSync } from 'fs';
import { Cell, Grid } from './lib/Grid';

const day = "07";
const input = readFileSync(`src/inputs/day${day}.txt`, 'utf-8').trim();
const testInput = readFileSync(`src/inputs/day${day}-test.txt`, 'utf-8').trim();

function part1(input: string): number {
    console.time("Part 1 Process Time");
    const grid = new Grid(input);
    const startingPosition = grid.getFlatGrid().find(cell => cell.cellValue === "S")!.position;
    const splitters = grid.getGrid().map(row => row.filter(cell => cell.cellValue === "^").map(splitter => ({ ...splitter, active: false })));
    for (let row = 1; row < grid.getHeight(); row++) {
        if (row === 1) {
            grid.setCell(startingPosition.row + 1, startingPosition.col, "|");
            continue;
        } else {
            const lasers = grid.getRow(row - 1).filter(cell => cell.cellValue === "|");
            const splittersInRow = splitters[row];
            lasers.forEach(cell => {
                const nextPosition = { ...cell.position, row: cell.position.row + 1 };
                if (splittersInRow.filter(x => !x.active).map(x => x.position).some(pos => pos.row === nextPosition.row && pos.col === nextPosition.col)) {
                    const [splitLeft, splitRight] = [
                        { ...nextPosition, col: nextPosition.col - 1 }, 
                        { ...nextPosition, col: nextPosition.col + 1 }
                    ];
                    grid.setCell(splitLeft.row, splitLeft.col, "|");
                    grid.setCell(splitRight.row, splitRight.col, "|");
                    splitters.flat().find(x => x.position.row === nextPosition.row && x.position.col === nextPosition.col)!.active = true;
                } else {
                    grid.setCell(nextPosition.row, nextPosition.col, "|");
                }
            });
        }
    }
    const splittersActive = splitters.flat().filter(x => x.active).length;

    console.timeEnd("Part 1 Process Time");
    return splittersActive;
}

function part2(input: string): number {
    console.time("Part 2 Process Time");

    const grid = new Grid(input);
    const gridTimelines = grid.getGrid().map(row => row.map(x => ({ ...x.position, count: 0 })));
    const startingPosition = grid.getFlatGrid().find(cell => cell.cellValue === "S")!.position;
    const splitters = grid.getGrid().map(row => row.filter(cell => cell.cellValue === "^").map(splitter => ({ ...splitter, active: false })));
    
    for (let row = 1; row < grid.getHeight(); row++) {
        if (row === 1) {
            grid.setCell(startingPosition.row + 1, startingPosition.col, "|");
            gridTimelines[startingPosition.row + 1][startingPosition.col].count++;
            continue;
        } else {
            const lasers = grid.getRow(row - 1).filter(cell => cell.cellValue === "|");
            const splittersInRow = splitters[row];
            lasers.forEach(cell => {
                const nextPosition = { ...cell.position, row: cell.position.row + 1 };
                if (splittersInRow.filter(x => !x.active).map(x => x.position).some(pos => pos.row === nextPosition.row && pos.col === nextPosition.col)) {
                    const [splitLeft, splitRight] = [
                        { ...nextPosition, col: nextPosition.col - 1 },
                        { ...nextPosition, col: nextPosition.col + 1 }
                    ];
                    grid.setCell(splitLeft.row, splitLeft.col, "|");
                    grid.setCell(splitRight.row, splitRight.col, "|");
                    splitters.flat().find(x => x.position.row === nextPosition.row && x.position.col === nextPosition.col)!.active = true;
                    gridTimelines[splitLeft.row][splitLeft.col].count += gridTimelines[cell.position.row][cell.position.col].count;
                    gridTimelines[splitRight.row][splitRight.col].count += gridTimelines[cell.position.row][cell.position.col].count;
                } else {
                    grid.setCell(nextPosition.row, nextPosition.col, "|");
                    gridTimelines[nextPosition.row][nextPosition.col].count += gridTimelines[cell.position.row][cell.position.col].count;
                }
            });
        }
    }

    const end = grid.getHeight() - 1;
    const count = gridTimelines.flat().filter(x => x.row === end).reduce((acc, curr) => acc + curr.count, 0);
    console.timeEnd("Part 2 Process Time");
    return count;
}

//console.log("Part 1 (Test Input):", part1(testInput));
//console.log("Part 2 (Test Input):", part2(testInput));
//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));