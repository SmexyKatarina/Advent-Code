import { day3InputPart1, day3InputPart2 } from "./input";

const calculatePart1 = () => {
    let count = 0;
    for (let i = 0; i < day3InputPart1.length; i += 2) {
        count += day3InputPart1[i] * day3InputPart1[i + 1];
    }
    return count;
}

const calculatePart2 = () => {
    let count = 0;
    let enabled = true;
    for (let i = 0; i < day3InputPart2.length; i++) {
        let input = day3InputPart2[i];
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