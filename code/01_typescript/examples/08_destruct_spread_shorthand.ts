type Person = { name: "Franco", age: 33 }
let person: Person

// destructuring
const { age, ...rest } = person; // age will be 33
// age = 33
// rest = {name: "Franco"}


// property shorthand
const shorthand = { person }; // short hand is {person: { name: "Franco", age: 33 }}
// shorthand = {person: { name: "Franco", age: 33 }}


// Spread Syntax
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2); 
// arr1.push(3, 4, 5)
// arr1 = [0, 1, 2, 3, 4, 5]

const reducer = (accumulator, current) => accumulator + current;
function sum(...args: number[]) {
    console.log("Args sum up to:", args.reduce(reducer))
}
sum(1, 2, 3)