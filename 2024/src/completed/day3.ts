import { testData, realData } from "../in-progress/input.ts";

const calculatePart1 = () => {
    let count = 0;
    for (let i = 0; i < realData.length; i += 2) {
        count += Number(realData[i]) * Number(realData[i + 1]);
    }
    return count;
}

const calculatePart2 = () => {
    let count = 0;
    let enabled = true;
    for (let i = 0; i < realData.length; i++) {
        let input = realData[i];
        if (input === "do") { enabled = true; continue; } 
        else if (input === "'") { enabled = false; continue }
        if (enabled) {
            const split = input.split(",").map(x => parseInt(x));
            count += split[0] * split[1];
        }
    }
    return count;
}

const run3 = () => {
    const calc = calculatePart2();
    console.log(`The total is ${calc}`);
}

run3();