import { testData, realData } from "./input";

const generateDiskString = (data: string) => {
    let arr: number[] = [];
    for (let i = 0; i < data.length; i++) {
        for (let x = Number(data[i]); x > 0; x--) {
            if (i % 2 === 0) {
                arr.push(i / 2)
            } else {
                arr.push(-1);
            }
        }
    }
    arr.forEach((el, index, arr) => {
        if (el === -1) {
            while (true) {
                const val = arr.pop();
                if (val === -1 || val === undefined) continue;
                else {
                    arr[index] = val;
                    break;
                }
            }
        }
    })
    return arr.filter(x => x !== undefined);
}

const executePart1 = (data: string) => {
    const diskString: number[] = generateDiskString(data);
    let sum = 0;
    let right = diskString.length - 1;
    for (let i = 0; i < diskString.length; i++) {
        if (i > right) {
            break;
        }
        if (diskString[i] === -1) {
            while (true) {
                if (diskString[right] === -1) { right--; continue; }
                diskString[i] = diskString[right];
                diskString[right] = -1;
                break;
            }
        }
        sum += diskString[i] * i;
    }
    return sum;
}

const executePart2 = (data: string) => {
}

const run9 = () => {
    let start = performance.now();
    console.log(`The sum is: ${executePart1(realData)}`);
    let end = performance.now();
    console.log(`Part 1: ${((end - start) / 1000).toFixed(5)} seconds`);
    /* start = performance.now();
    console.log(`The number of unique positions is: ${executePart2(testData)}`);
    end = performance.now();
    console.log(`Part 2: ${((end - start) / 1000).toFixed(5)} seconds`); */
}

run9();