// Type definition
// Can have optionals
type Person = {
    name: string;
    age: number;
    gender?: Gender
}

// Enums can also be strings
enum Gender {
    Male,
    Female,
    Diverse = 'd'
}
  
const person: Person = { name: "Sarah", age: 33, gender: Gender.Female};
  
//   person.age = "24"; // TS2322: Type '"24"' is not assignable to type 'number'
//   person.height = 5.11; // TS2339: property 'height' does not exist on type 'Person'

// Interfaces
interface ILocatable {
    nationality: string
}

// Classes
class People implements ILocatable {
    public nationality: string

    public persons: Person[] = []

    public readonly type = "people"

    constructor(persons: Person[], nationality: string) {
        this.persons = persons
        this.nationality = nationality

        // this.type = "foo" --> Does not work, because readonly
    }

    public logAllPeopleNames() {
        console.log("Persons:", this.namesToString())
    }

    private namesToString() {
        return this.persons.map(t => t.name)
    }

}

const people = new People([person], "Switzerland")

people.logAllPeopleNames() // Works
// people.nameToString() // Does not work --> Private

// Union Types
function test(arg: Person | People) {
    if (arg instanceof People) {
        console.log("arg are definitely People", arg.logAllPeopleNames())
    } else {
        console.log("arg is definitely Person", arg.name)
        if (arg.gender === Gender.Male) {
            console.log("This person is a male")
        } else {
            console.log("This person is not a male")
        }
    }
}

// template strings

const greeting = `Hello, my name is ${person.name} and I am ${person.age} years old. My gener is ${Gender[person.gender!]}`; 
console.log("Greeting:", greeting)
// Enums in ts work in both directions i can get the text representation that way. Since "gender" is optional Gender[val] could fail. 
// But i can tell the compiler with "!" that i am sure it has a value


// destructuring
const { age, ...rest } = person; // age will be 33
console.log("Age:", age)
console.log("Rest:", rest)


// property shorthand
const shorthand = { person }; // short hand is {person: { name: "Franco", age: 33 }}
console.log("Shorthand:", shorthand)

// Spread Syntax
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2); 
console.log("Array1:", arr1)

const reducer = (accumulator, current) => accumulator + current;
function sum(...args: number[]) {
    console.log("Args sum up to:", args.reduce(reducer))
}
sum(1, 2, 3)


// fat arrow functions
function logNameOldSchool(person: Person) {
    console.log(person.name)
    console.log()
}

const logNameArrow = (person: Person) => {
    console.log(person.name)
};

const logNameShort = person => console.log(person.name);

// let and const
let canChange = 5;
const cannotChange = 5;
// cannotChange = 4; // Cannot assign to 'cannotChange' because it is a constant.ts(2588)


// Importing JSON!
import * as data from './data.json';
console.log(data.foo)