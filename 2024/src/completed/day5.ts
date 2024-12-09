import { testData, realData } from "../in-progress/input.ts";

const separateData = (data: string[]) => {
    let leftRules: number[] = [];
    let rightRules: number[] = [];
    let pageOrders: number[][] = [];
    for (let i = 0; i < data.length; i++) {
        const line = data[i];
        if (line.includes("|")) {
            const split = line.split("|").map(x => parseInt(x));
            leftRules.push(split[0]);
            rightRules.push(split[1]);
        }
        else
            pageOrders.push(line.split(",").map(x => parseInt(x)));
    }
    return { leftRules, rightRules, pageOrders };
};
const getOrders = (leftRules: number[], rightRules: number[], pageOrders: number[][]) => {
    let correct: number[][] = [];
    let incorrect: number[][] = [];
    for (let orderIndex = 0; orderIndex < pageOrders.length; orderIndex++) {
        const order = pageOrders[orderIndex];
        for (let orderSearch = 0; orderSearch < order.length; orderSearch++) {
            const leftIndexes = leftRules.map((x, i) => x === order[orderSearch] ? i : -1).filter(y => y !== -1 && rightRules[y] === order[orderSearch + 1]);
            if (leftIndexes.length === 0 && !(orderSearch + 1 >= order.length)) {
                incorrect.push(order);
                break;
            }
            if (orderSearch + 1 >= order.length) {
                correct.push(order);
                break;
            }
        }
    }
    return { correct, incorrect };
};
const partA = (leftRules: number[], rightRules: number[], pageOrders: number[][]) => {
    let sum = 0;
    for (let orderIndex = 0; orderIndex < pageOrders.length; orderIndex++) {
        const order = pageOrders[orderIndex];
        for (let orderSearch = 0; orderSearch < order.length; orderSearch++) {
            const leftIndexes = leftRules.map((x, i) => x === order[orderSearch] ? i : -1).filter(y => y !== -1 && rightRules[y] === order[orderSearch + 1]);
            if (leftIndexes.length === 0 && !(orderSearch + 1 >= order.length)) {
                break;
            }
            if (orderSearch + 1 >= order.length) {
                sum += order[Math.floor(order.length / 2)];
                break;
            }
        }
    }
    return sum;
};
const verifyOrder = (leftRules: number[], rightRules: number[], order: number[]) => {
    for (let orderSearch = 0; orderSearch < order.length; orderSearch++) {
        const leftIndexes = leftRules.map((x, i) => x === order[orderSearch] ? i : -1).filter(y => y !== -1 && rightRules[y] === order[orderSearch + 1]);
        if (leftIndexes.length === 0 && !(orderSearch + 1 >= order.length)) {
            return false;
        }
        if (orderSearch + 1 >= order.length) {
            return true;
        }
    }
};
const sortOrder = (leftRules: number[], rightRules: number[], order: number[]) => {
    let tries = 0;
    while (tries !== 1000) {
        for (let i = 1; i < order.length; i++) {
            let prev = order[i - 1]; 
            let curr = order[i];
            let next = order[i + 1]; 
            if (prev) {
                const leftIndexes = leftRules.map((x, i) => x === curr ? i : -1).filter(y => y !== -1 && rightRules[y] === prev);
                if (leftIndexes.length !== 0) {
                    let temp = order[i - 1];
                    order[i - 1] = curr;
                    order[i] = temp;
                    if (verifyOrder(leftRules, rightRules, order)) {
                        return order;
                    }
                    else {
                        i -= 1;
                        continue;
                    }
                }
            }
            else if (next) {
                const rightIndexes = rightRules.map((x, i) => x === curr ? i : -1).filter(y => y !== -1 && leftRules[y] === next);
                if (rightIndexes.length !== 0) {
                    let temp = order[i + 1];
                    order[i + 1] = curr;
                    order[i] = temp;
                    if (verifyOrder(leftRules, rightRules, order)) {
                        return order;
                    }
                    else {
                        i -= 1;
                        continue;
                    }
                }
            }
        }
        tries++;
    }
    return [];
};
const run5 = () => {
    const { leftRules, rightRules, pageOrders } = separateData(realData);
    let sums = { correct: 0, incorrect: 0 };
    const { correct, incorrect } = getOrders(leftRules, rightRules, pageOrders);
    sums.correct = partA(leftRules, rightRules, pageOrders);
    for (let i = 0; i < incorrect.length; i++) {
        const incorrectOrder = incorrect[i];
        const sorted = sortOrder(leftRules, rightRules, incorrectOrder);
        sums.incorrect += sorted[Math.floor(sorted.length / 2)];
    }
    console.log(`The sums are: ${sums.correct} and ${sums.incorrect}`);
};
run5();