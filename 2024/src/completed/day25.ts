import { testData, realData } from "../in-progress/input"

const parseData = (data: string[]) => {
    let mapping: string = "";
    let keys: number[][] = [];
    let locks: number[][] = [];
    let temp: number[] = [0, 0, 0, 0, 0];
    let start = 0;
    for (let i = 0; i < data.length; i++) {
        let split = data[i].split("");
        if (i === start + 6) {
            mapping === "k" ? keys.push(temp) : locks.push(temp);
            mapping = "";
        } else if (mapping === "") {
            mapping = split.every(x => x === "#") ? "l" : "k";
            temp = [0, 0, 0, 0, 0];
            start = i;
        } else {
            split.forEach((x, index) => {
                if (x === "#") temp[index]++;
            })
        }
    }
    return { keys: keys, locks: locks };
}
const executePart1 = (data: string[]) => {
    const { keys, locks } = parseData(data);
    let count = 0;
    for (let i = 0; i < locks.length; i++) {
        const lock = locks[i];
        let foundKeys: number[][] = [];
        keys.forEach(x => {
            if (x.every((y, index) => y <= (5 - lock[index]))) {
                foundKeys.push(x);
                count++;
            }
        });
    }

    return count;
}
const run = () => {
    let start = performance.now();
    console.log(`The number of pairs is: ${executePart1(realData)}`);
    let end = performance.now();
    console.log(`Part 1: ${((end - start) / 1000).toFixed(5)} seconds`);
}

run();