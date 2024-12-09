import { testData, realData } from "../in-progress/input.ts";

const getDirection = (direction: number) => {
    return [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ][direction];
}


const recursiveDirection = (prevX: number, prevY: number, direction: number[], search: string, searchIndex: number, data: string[]) => {
    let next = [prevX+direction[0], prevY+direction[1]];
    if (next.some(x => x < 0 || x >= data.length) || data[next[0]][next[1]] !== search[searchIndex]) return false;
    if (searchIndex === search.length - 1) return true;
    return recursiveDirection(next[0], next[1], direction, search, searchIndex + 1, data);
}

const part1Execution = (data: string[]) => {
    const needle = "XMAS";
    let count = 0;
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            if (data[x][y] !== "X") continue;
            for (let direction = 0; direction < 8; direction++) {
                if (recursiveDirection(x, y, getDirection(direction), needle, 1, data)) {
                    count++;
                }
            }

        }
    }
    console.log(count);
}

const part2Execution = (data: string[]) => {
    let count = 0;
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            if (data[x][y] !== "A") continue;
            const directions = [
                [x - 1, y - 1], 
                [x - 1, y + 1], 
                [x + 1, y - 1], 
                [x + 1, y + 1] 
            ];
            if (directions.some(x => x.some(y => y < 0 || y >= data.length))) continue;
            const placements = [
                (data[directions[0][0]][directions[0][1]] === "M" && data[directions[3][0]][directions[3][1]] === "S"), // Top Left -> Bottom Right
                (data[directions[1][0]][directions[1][1]] === "M" && data[directions[2][0]][directions[2][1]] === "S"), // Top Right -> Bottom Left
                (data[directions[1][0]][directions[1][1]] === "S" && data[directions[2][0]][directions[2][1]] === "M"), // Bottom Left -> Top Right
                (data[directions[0][0]][directions[0][1]] === "S" && data[directions[3][0]][directions[3][1]] === "M"), // Bottom Right -> Top Left
            ];
            if ((placements[0] && placements[1]) || (placements[2] && placements[3]) || (placements[0] && placements[2]) || (placements[1] && placements[3])) {
                count++;
            }
        }
    }
    console.log(count);
}

const run4 = () => {
    part1Execution(realData);
    part2Execution(realData);
}

run4();