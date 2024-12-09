//import { testData, day6Input } from './input';

const locateStartingPos = (data: string[]) => {
    for (let i = 0; i < data.length; i++) {
        const index = data[i].indexOf("^");
        if (index !== -1) return { x: i, y: index };
    }
    return false;
}

const checkPrevPositions = (prevPositions: number[][], check: number[]) => {
    for (let i = 0; i < prevPositions.length; i++) {
        let [x, y] = prevPositions[i];
        if (x === check[0] && y === check[1]) return true;
    }
    return false;
}

const executePart1 = (data: string[]) => {

    const startingPos = locateStartingPos(data);
    if (!startingPos) { console.log("No starting pos"); return; }

    let { x, y } = { x: startingPos.x, y: startingPos.y };

    let direction = 0;
    const posAdd = [
        [-1, 0], [0, 1],
        [1, 0], [0, -1]
    ];

    let rangeCheck = (x: number) => x < 0 || x >= data[0].length;

    let count = 1;
    let prevPositions: number[][] = [[x, y]];

    while (true) {
        let add = posAdd[direction];
        let nx = x + add[0], ny = y + add[1];
        if (rangeCheck(nx) || rangeCheck(ny)) break;
        if (data[nx].charAt(ny) === '#') {
            direction = direction + 1 === 4 ? 0 : direction + 1;
            continue;
        }
        if (!checkPrevPositions(prevPositions, [nx, ny])) {
            count++;
            prevPositions.push([nx, ny]);
        }
        x = nx, y = ny;
    }

    return count;
}

const executePart2 = (data: string[]) => {

    const startingPos = locateStartingPos(data);
    if (!startingPos) { console.log("No starting pos"); return; }
    let { guardX, guardY } = { guardX: startingPos.x, guardY: startingPos.y };
    const posAdd = [
        [-1, 0], [0, 1],
        [1, 0], [0, -1]
    ];
    let loopCount = 0;
    const convertPosition = (x: number, y: number, dir: number) => (x * data.length + y) * 4 + dir;
    let getGuardPath = () => {
        let [x, y] = [guardX, guardY];
        let direction = 0;
        let previousPositions: number[][] = [[x, y]];
        while (true) {
            let add = posAdd[direction];
            let nx = x + add[0], ny = y + add[1];
            if (nx < 0 || ny < 0 || nx >= data.length || ny >= data[0].length) break;
            if (data[nx].charAt(ny) === '#') {
                direction = direction + 1 === 4 ? 0 : direction + 1;
                continue;
            }
            if (!checkPrevPositions(previousPositions, [nx, ny])) {
                previousPositions.push([nx, ny]);
            }
            x = nx, y = ny;
        }
        return previousPositions;
    } 
    let validPositions = getGuardPath();
    for (let obstacleCheck = 0; obstacleCheck < validPositions.length; obstacleCheck++) {
        let [obX, obY] = validPositions[obstacleCheck];
        const tempData = data.map(x => [...x]);
        tempData[obX][obY] = "#";
        let [x, y] = [guardX, guardY];
        let direction = 0;
        let previousPositions: number[] = [];
        while (true) {
            const convert = convertPosition(x, y, direction);
            if (previousPositions.includes(convert)) { loopCount++; break; }
            previousPositions.push(convert);
            let [nx, ny] = [x + posAdd[direction][0], y + posAdd[direction][1]];
            if (nx < 0 || ny < 0 || nx >= data.length || ny >= data[0].length) break;
            if (tempData[nx][ny] === "#") direction = direction + 1 > 3 ? 0 : direction + 1; 
            else [x, y] = [nx, ny];
        }
    }
    return loopCount;
}
const run6 = () => {
    let part1Answer = executePart1([]);
    let part2Answer = executePart2([]);
    console.log(`The count is ${part1Answer}.`);
    console.log(`The count is ${part2Answer}.`);
}
run6();