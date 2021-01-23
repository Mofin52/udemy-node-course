const num1El = document.getElementById("num1") as HTMLInputElement;
const num2El = document.getElementById("num2") as HTMLInputElement;
const btnEl = document.querySelector("button")!;
const resultEl = document.getElementById("result")!;

const numResults: number[] = [];
// const numResults: Array<number> = [];

const textResults: string[] = [];
// const numResults: Array<string> = [];

type NumOrString = number | string;
type Result = { val: number; timestamp: Date };

interface ResultObject {
  val: number;
  timestamp: Date;
}

function add(num1: NumOrString, num2: NumOrString) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + " " + num2;
  }
  return Number(num1) + Number(num2);
}

function printResult(resultObj: Result) {
  console.log(resultObj.val);
}

btnEl.addEventListener("click", () => {
  const result = add(Number(num1El.value), Number(num2El.value));
  const stringResult = add(num1El.value, num2El.value);
  numResults.push(result as number);
  textResults.push(stringResult as string);
  printResult({ val: result as number, timestamp: new Date() });
  resultEl.innerText = String(result) + "\n " + stringResult;
  console.log(numResults, textResults);
});

const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("It worked!");
  }, 1000);
});

myPromise.then((result) => {
  console.log(result.split("w"));
});
