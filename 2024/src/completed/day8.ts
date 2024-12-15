import { testData, realData } from "../in-progress/input";

type Antenna = {
    symbol: string,
    positions: number[][]
};

const getAntennas = (data: string[]) => {
    const antennas: Antenna[] = [];
    const regex = /([A-Za-z0-9]{1})/g
    for (let x = 0; x < data.length; x++) {
        let row = data[x];
        if (row.split("").every(x => x === ".")) continue;
        for (let y = 0; y < row.length; y++) {
            let cell = row[y];
            const match = cell.match(regex);
            if (!match) continue;
            const indexCheck = antennas.map(x => x.symbol).indexOf(match[0]);
            if (indexCheck !== -1) {
                antennas[indexCheck].positions.push([x, y]);
            } else {
                antennas.push({ symbol: match[0], positions: [[x, y]] });
            }
        }
    }
    return antennas;
}

const getAntinode = (x: number, y: number, nx: number, ny: number, height: number, width: number) => {
    let [ax, ay] = [x, y];
    let [diffx, diffy] = [x - nx, y - ny];
    ax = diffx < 0 ? ax - Math.abs(diffx) : ax + diffx;
    ay = diffy < 0 ? ay - Math.abs(diffy) : ay + diffy;
    if (ax < 0 || ax >= width || ay < 0 || ay >= height) return false;
    else return [ax, ay];
}

const recursiveAntinodeSearch = (startX: number, startY: number, directionX: number, directionY: number, height: number, width: number) => {
    let [x, y] = [startX, startY];
    let [diffX, diffY] = [x - directionX, y - directionY];
    let prevFound: number[][] = [];
    while (true) {
        const antinode = getAntinode(x, y, x + diffX, y + diffY, height, width);
        if (antinode) {
            prevFound.push(antinode);
        } else break;
        [x, y] = [x + diffX, y + diffY];
    }
    return prevFound;
}

const checkDuplicate = (prev: number[][], curr: number[]) => {
    for (let x = 0; x < prev.length; x++) {
        if (prev[x][0] === curr[0] && prev[x][1] === curr[1]) return true;
    }
    return false;
};


const executePart1 = (data: string[]) => {
    const antennas = getAntennas(data);
    const [width, height] = [data[0].length, data.length];
    let uniquePositions: number[][] = [];
    for (let curr = 0; curr < antennas.length; curr++) {
        let currAntenna = antennas[curr];
        currAntenna.positions.flatMap((pos, index) => {
            let [x, y] = pos;
            let antinodes = currAntenna.positions
                .filter((_, i) => i !== index)
                .map(([nx, ny]) => getAntinode(x, y, nx, ny, height, width))
                .filter((result) => result !== false)
                .filter(antinode => !checkDuplicate(uniquePositions, antinode));
            uniquePositions.push(...antinodes);
        });
    }
    return uniquePositions.length;
}

const executePart2 = (data: string[]) => {
    const antennas = getAntennas(data);
    const [width, height] = [data[0].length, data.length];
    let uniquePositions: number[][] = [];
    for (let curr = 0; curr < antennas.length; curr++) {
        let currAntenna = antennas[curr];
        currAntenna.positions.flatMap((pos, index) => {
            let [x, y] = pos;
            currAntenna.positions
            .filter((_, i) => i !== index)
            .map(([nx, ny]) => 
                recursiveAntinodeSearch(x, y, nx, ny, height, width)
                .forEach(antinode => {
                    if (!checkDuplicate(uniquePositions, antinode)) {
                        uniquePositions.push(antinode);
                    }
                })
            )
        });
    }
    return uniquePositions.length;
}

const run8 = () => {

    let start = performance.now();
    console.log(`The number of unique positions is: ${executePart1(realData)}`);
    let end = performance.now();
    console.log(`Part 1: ${((end - start) / 1000).toFixed(5)} seconds`);
    start = performance.now();
    console.log(`The number of unique positions is: ${executePart2(realData)}`);
    end = performance.now();
    console.log(`Part 2: ${((end - start) / 1000).toFixed(5)} seconds`);
}

run8();