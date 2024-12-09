import { testData, realData } from "../in-progress/input.ts";

const checkSort = (level: number[], descending?: boolean) => {
    const sorted = descending ? [...level].sort((a, b) => a < b ? -1 : 1).reverse() : [...level].sort((a, b) => a < b ? -1 : 1);
    for (let i = 0; i < level.length; i++) if (level[i] !== sorted[i]) return false;
    return true;
}
const inRange = (num: number, x: number, y: number) => { return x <= num && num <= y };
const isValidLevel = (level: number[]) => {

    let validFunc = (levelArray: number[]) => {
        for (let i = 0; i < levelArray.length; i++) {
            const curr = levelArray[i]; const next = levelArray[i + 1];
            if (!next) break;
            if (!inRange(curr, next - 3, next + 3) || curr === next) {
                return false;
            }
        }
        return true;
    }
    let values: boolean[] = [];
    for (let i = 0; i < level.length + 1; i++) {
        let usedArray: number[] = i === 0 ? level : [...level].filter((_, ind) => ind !== i);
        values.push((checkSort(usedArray) || checkSort(usedArray, true)) && validFunc(usedArray));
    }
    return values.some(x => x);
}
const runLevelChecks = () => {
    let safe = 0;
    realData.forEach((level) => {
        const levelArray = level.split(" ").map(x => parseInt(x));
        if (isValidLevel(levelArray)) {
            safe++;
        }
    });
    console.log(`The amount of safe reports is: ${safe}`);
}
runLevelChecks();

