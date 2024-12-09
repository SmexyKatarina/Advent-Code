import { testData, day7Inputs, add } from './input';

const generatePossibleCombinations = (inputs: number[], operators: string[]) => {
    const combinations = (arr: string[], min: number = 1, max: number) => {
        const combination: (arr: string[], depth: number) => string[] = (arr: string[], depth: number) => {
          if (depth === 1) {
            return arr;
          } else {
            const result = combination(arr, depth - 1).flatMap((val) =>
              arr.map((char) => val + char)
            );
            return arr.concat(result);
          }
        };
      
        return combination(arr, max).filter((val) => val.length >= min);
    };
    const result = combinations(operators, inputs.length - 1, inputs.length - 1).map(x => [...x].map(y => operators.indexOf(y)));
    return result;
}

const executePart1 = (data: string[]) => {
    const operators = ['+', '*'];

    let sum = 0n;

    for (let i = 700; i < 850; i++) {
        const equation = data[i].split(":").map(x => x.trim());
        console.log(`Evaluating: ${data[i]} (${i})`);
        const answer = BigInt(equation[0]);
        const integers = equation[1].split(" ").map(x => parseInt(x));
        const possibleCombinations: number[][] = generatePossibleCombinations(integers, operators);
        for (let combo = 0; combo < possibleCombinations.length; combo++) {
            //let c = possibleCombinations[combo];
            //let completeEqu = integers.join("%OPERATOR%");
            let answerSum = 0n;
            for (let op = 0; op < possibleCombinations[combo].length; op++) {
                //completeEqu = completeEqu.replace("%OPERATOR%", operators[c[op]]);
                if (op === 0) {
                    answerSum = BigInt(eval(integers[0].toString() + operators[possibleCombinations[combo][op]] + integers[1].toString()));
                    //console.log(integers[0].toString() + operators[c[op]] + integers[1].toString());
                } else {
                    answerSum = BigInt(eval(answerSum.toString() + operators[possibleCombinations[combo][op]] + integers[op+1].toString()));
                    //console.log(answerSum.toString() + operators[c[op]] + integers[op+1].toString());
                }
            }
            //console.log(`Equation ${completeEqu} evaluates to ${answerSum}`);
            if (answerSum === answer) {
                //console.log(`Found answer with: ${data[i]}. Equation: ${completeEqu}`);
                sum += answer;
                break;
            }
        }
    }

    return sum;
}

const executePart2 = (data: string[]) => {
    const operators = ["+", "*", "|"];

    let sum = 0n;

    for (let i = 0; i < 100; i++) {
        const equation = data[i].split(":").map(x => x.trim());
        console.log(`Evaluating: ${data[i]} (${i})`);
        const answer = BigInt(equation[0]);
        const integers = equation[1].split(" ").map(x => parseInt(x));
        const possibleCombinations: number[][] = generatePossibleCombinations(integers, operators);
        //possibleCombinations.map(console.log);
        for (let combo = 0; combo < possibleCombinations.length; combo++) {
            //let c = possibleCombinations[combo];
            //let completeEqu = integers.join("%OPERATOR%");
            let answerSum = 0n;
            for (let op = 0; op < possibleCombinations[combo].length; op++) {
                //completeEqu = completeEqu.replace("%OPERATOR%", operators[c[op]]);
                //console.log(operators[possibleCombinations[combo][op]]);
                if (op === 0) {
                    if (operators[possibleCombinations[combo][op]] === "|") {
                        answerSum = BigInt(integers[0].toString() + integers[1].toString());
                        continue;
                    } else {
                        answerSum = BigInt(eval(integers[0].toString() + operators[possibleCombinations[combo][op]] + integers[1].toString()));
                    }
                    //console.log(integers[0].toString() + operators[c[op]] + integers[1].toString());
                } else {
                    if (operators[possibleCombinations[combo][op]] === "|" ) {
                        answerSum = BigInt(answerSum.toString() + integers[op+1].toString());
                        continue;
                    } else {
                        answerSum = BigInt(eval(answerSum.toString() + operators[possibleCombinations[combo][op]] + integers[op+1].toString()));

                    }
                    //console.log(answerSum.toString() + operators[c[op]] + integers[op+1].toString());
                }
            }
            //console.log(`Equation ${completeEqu} evaluates to ${answerSum}`);
            if (answerSum === answer) {
                //console.log(`Found answer with: ${data[i]}. Equation: ${completeEqu}`);
                sum += answer;
                break;
            }
        }
    }

    return sum;
}

const run7 = () => {

    //console.log(executePart1(day7Inputs));
    console.log(executePart2(day7Inputs));
    //console.log(add.reduce((prev, curr) => prev + curr));
}

run7();