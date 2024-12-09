import { testData, realData } from "../in-progress/input.ts";

const createLists = () => {
    let left: number[] = [];
    let right: number[] = [];
    for (let i = 0; i < realData.length; i++) {
        const split = realData[i].split(",").map(x => parseInt(x));
        left.push(split[0]);
        right.push(split[1]);
    }
    return { left, right };
}

const distanceBetween = () => {
    let { left, right } = createLists();
    left.sort();
    right.sort();
    let distance = 0;
    for (let i = 0; i < left.length; i++) {
        distance += Math.abs(left[i] - right[i]);
    }
    console.log(`The combined distance is: ${distance}`);
}

const run1 = () => {
    let { left, right } = createLists();
    let count = 0;
    for (let i = 0; i < left.length; i++) {
        count += left[i] * right.filter(x => x === left[i]).length;
    }
    console.log(`The similarity count is: ${count}`);
};
run1();