import { testData, realData } from "../in-progress/input";

const checkEquation = (input: string[], operators: number) => {
    const answer = BigInt(input[0]);
    const values = input[1].split(" ");
    const max = operators ** (values.length - 1);
    for (let i = 0; i < max; i++) {
        let sum = BigInt(values[0]);
        const naryString: string[] = i.toString(operators).padStart(values.length - 1, "0").split("");
        let inputIndex = 1;
        for (let x = 0; x < naryString.length; x++) {
            const naryValue = naryString[x];
            if (naryValue === "0") {
                sum *= BigInt(values[inputIndex]);
            } else if (naryValue === "1") {
                sum += BigInt(values[inputIndex]);
            } else {
                sum = BigInt(`${sum}${values[inputIndex]}`);
            }
            if (sum > answer) break;
            inputIndex++; 
        }
        if (sum === answer) return true;
    }
    return false;
}

const executePart1 = (data: string[]) => {
    console.time("Run Part-1");
    let sum = 0n;
    let correctIndexes: number[] = [];
    for (let i = 0; i < data.length; i++) {
        let split = data[i].split(": ");
        if (checkEquation(split, 2)) {
            correctIndexes.push(i);
            sum += BigInt(split[0]);
        }
    }
    console.log(sum);
    console.timeEnd("Run Part-1");
    return correctIndexes;
}

const executePart2 = (data: string[], indexes: number[]) => {

    console.time("Run Part-2");
    let sum = 0n;
    for (let i = 0; i < data.length; i++) {
        let split = data[i].split(": ");
        if (indexes.includes(i) || checkEquation(split, 3)) {
            sum += BigInt(split[0]);
        }
    }
    console.log(sum);
    console.timeEnd("Run Part-2"); 
}

const run7 = () => {
    const correctIndexes = executePart1(realData);
    executePart2(realData, correctIndexes);
}

run7();