import { testData, realData } from "../in-progress/input";

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

const generateDiskBlocks = (data: string) => {
    let arr: number[] = [];
    for (let i = 0; i < data.length; i++) {
        for (let x = Number(data[i]); x > 0; x--) {
            arr.push(i % 2 === 0 ? i / 2 : -1);
        }
    }
    const sorted = [...new Set([...arr].filter(x => x !== -1).reverse())];
    let id = 0;
    while (id < sorted.length) {
        let fileLength = arr.filter(x => x === sorted[id]).length;
        let firstIndex = arr.indexOf(sorted[id]);
        for (let x = 0; x < arr.length; x++) {
            if (x >= firstIndex) break;
            if (arr[x] === -1) {
                let check = x + 1;
                while (arr[check] === -1) {
                    check++;
                }
                let length = check - x;
                if (length >= fileLength) {
                    arr.splice(firstIndex, fileLength, ...Array(fileLength).fill(-1));
                    arr.fill(sorted[id], x, x + fileLength);
                    break;
                } else {
                    x = check;
                    continue;
                }
            }
        }
        id++;
    }
    return arr;
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
    const diskArray: number[] = generateDiskBlocks(data);
    let sum = 0;
    for (let i = 0; i < diskArray.length; i++) {
        if (diskArray[i] === -1) continue;
        sum += diskArray[i] * i;
    }
    return sum;
}

const run9 = () => {
    let start = performance.now();
    console.log(`The sum is: ${executePart1("")}`);
    let end = performance.now();
    console.log(`Part 1: ${((end - start) / 1000).toFixed(5)} seconds`);
    start = performance.now();
    console.log(`The sum is: ${executePart2("")}`);
    end = performance.now();
    console.log(`Part 2: ${((end - start) / 1000).toFixed(5)} seconds`);
}

run9();