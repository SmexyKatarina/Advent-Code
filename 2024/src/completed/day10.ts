import { testData, realData } from "../in-progress/input"
/**
 * Get the North-Clockwise positions for `X` and `Y`
 * @param x The current `X` position in the grid
 * @param y The current `Y` position in the grid
 * @returns An `number[][]` of all adjacent grid locations
 */
const getAdjacents = (x: number, y: number) => [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
/**
 * Turns the input `data` into a `number[][]` for indexing
 * @param data The input data
 * @returns A `number[][]` containing the grid input
 */
const generateGrid = (data: string[]) => data.map(x => [...x].map(Number));
/**
 * Gathers all possible starting positions, where the starting is `0`, and returns them in positional format.
 * @param grid The grid data
 * @returns An `number[][]` of the positions containing `0`, the 'trail-head'.
 */
const getStartingPositions = (grid: number[][]) => {
    let positions: number[][] = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === 0) positions.push([x, y]);
        }
    }
    return positions;
}
/**
 * 
 * @param x The `x` position to check
 * @param y The `y` position to check
 * @param positions The `number[][]` of positions to search through
 * @returns `True` if it already contains the position, otherwise `False`.
 */
const containsPosition = (x: number, y: number, positions: number[][]) => {
    for (let i = 0; i < positions.length; i++) {
        const [cx, cy] = positions[i];
        if (x === cx && y === cy) return true;
    }
    return false;
}
/**
 * Checks whether `X` and `Y` is within the margins of the `grid`
 * @param x The `X` position to check
 * @param y The `Y` position to check
 * @param gridSize The size of the `grid`
 * @returns `True` if the position is within the confines of the grid, otherwise `False`.
 */
const isInGrid = (x: number, y: number, gridSize: number) => x >= 0 && y >= 0 && x < gridSize && y < gridSize; 
let foundPositions: number[][] = [];
/**
 * 
 * @param currentX The current `X` position in the `grid`
 * @param currentY The current `Y` position in the `grid`
 * @param next The `number` to look for at the next position
 * @param grid The `grid` layout to traverse
 * @param duplicates 
 * @returns 
 */
const recursiveMove = (currentX: number, currentY: number, next: number, grid: number[][], duplicates: boolean = false) => {
    let adj = getAdjacents(currentX, currentY).filter(([x, y]) => isInGrid(x, y, grid.length) && grid[x][y] === next);
    if (grid[currentX][currentY] === 9) {
        if (!duplicates) 
            if (!containsPosition(currentX, currentY, foundPositions)) foundPositions.push([currentX, currentY]);
        else foundPositions.push([currentX, currentY]);
        return;
    } else return adj.forEach(([x, y]) => recursiveMove(x, y, next + 1, grid, duplicates));
}

const executePart1 = (data: string[]) => {
    let sum = 0;
    const grid: number[][] = generateGrid(data);
    const trailStarts: number[][] = getStartingPositions(grid);
    for (let startIndex = 0; startIndex < trailStarts.length; startIndex++) {
        let [x, y] = trailStarts[startIndex];
        foundPositions = [];
        recursiveMove(x, y, 1, grid);
        const score = foundPositions.length;
        sum += score;
    }
    return sum;
}

const executePart2 = (data: string[]) => {
    let sum = 0;
    const grid: number[][] = generateGrid(data);
    const trailStarts: number[][] = getStartingPositions(grid);
    for (let startIndex = 0; startIndex < trailStarts.length; startIndex++) {
        let [x, y] = trailStarts[startIndex];
        foundPositions = [];
        recursiveMove(x, y, 1, grid, true);
        const score = foundPositions.length;
        sum += score;
    }
    return sum;
}

const run = () => {
    let start = performance.now();
    console.log(`The total score is: ${executePart1([])}`);
    let end = performance.now();
    console.log(`Part 1: ${((end - start) / 1000).toFixed(5)} seconds`);
    start = performance.now();
    console.log(`The total score is: ${executePart2([])}`);
    end = performance.now();
    console.log(`Part 2: ${((end - start) / 1000).toFixed(5)} seconds`);
}

run();