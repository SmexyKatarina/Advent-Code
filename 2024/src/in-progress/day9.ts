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

const generateDiskBlocks = (data: string) => {
    let arr: number[][] = [];

    for (let i = 0; i < data.length; i++) {
        let block: number[] = [];
        block.length = Number(data[i]);
        if (block.length === 0) continue;
        if (i % 2 === 0) {
            block.fill(i / 2);
            arr.push(block);
        } else {
            block.fill(-1);
            arr.push(block);
        }
    }

    //console.log(arr);

    for (let fileBlock = arr.length - 1; fileBlock > 0; fileBlock -= 2) {
        let freeBlocks = arr.map((x, i) => {
            //console.log(`${x.filter(y => y === -1).length} >= ${arr[fileBlock].length} => ${x.filter(y => y === -1).length >= arr[fileBlock].length}`);
            if (x.filter(y => y === -1).length >= arr[fileBlock].length && i % 2 === 1) {
                return { array: x, index: i };
            } else {
                return { array: [-2], index: -2 };
            }
        }).filter(y => y.index !== -2);
        if (freeBlocks.length === 0) continue;
        let freeBlock = freeBlocks[0];
        console.log(`Before: ${arr[fileBlock]}, ${arr[freeBlock.index]}`);
        let deleted = freeBlock.array.splice(freeBlock.array.indexOf(-1), arr[fileBlock].length, ...arr[fileBlock]);
        arr[freeBlock.index] = freeBlock.array;
        arr[fileBlock] = deleted;
        console.log(`Before: ${arr[fileBlock]}, ${arr[freeBlock.index]}`);
    }
    

    return arr.reduce((prev, curr) => prev.concat(curr));
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
    const diskString: number[] = generateDiskBlocks(data);
    console.log(diskString.map(x => x === -1 ? "." : x).join(""));
    let sum = 0;

    for (let i = 0; i < diskString.length; i++) {
        if (diskString[i] === -1) continue;
        sum += Number(diskString[i]) * i;
    }

    return sum;
}

const run9 = () => {
    let start = performance.now();
    console.log(`The sum is: ${executePart1(realData)}`);
    let end = performance.now();
    console.log(`Part 1: ${((end - start) / 1000).toFixed(5)} seconds`);
    start = performance.now();
    console.log(`The sum is: ${executePart2(testData)}`);
    end = performance.now();
    console.log(`Part 2: ${((end - start) / 1000).toFixed(5)} seconds`);
}

run9();