//import { testInput, day1Input } from "./input";

const input = [];

const numberParse = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const mapNumber = (x: string) => {
    if (numberParse.includes(x)) {
        return numberParse.indexOf(x) + 1;
    }
    return Number(x);
}

const getNumber = (input: string) => {
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
    const matches = [...input.matchAll(regex)];
    const parsed = matches.map(x => mapNumber(x[1]));
    if (matches.length === 1) {
        return Number(parsed[0].toString().concat(parsed[0].toString()));
    } else {
        return Number(parsed[0].toString().concat(parsed[parsed.length - 1].toString()))
    }
}

const run = () => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        const number = getNumber(input[i]);
        count += number;
    }
    console.log(`The total is ${count}`);
}

run();