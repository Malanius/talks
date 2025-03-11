# TypeScript

"Strongly" typed Javascript

---

## Introduction

`-`

### What is Typescript

- JavaScript superset
- Build upon JS and adds new features to it
- can't be executed directly by the JS environment (browser, node)
- is compiled to pure JS
- TS features are compiled to JS "workarounds"
- add types and type checking to the JS

`-`

### Why typescript

What will happen?

```javascript
function add(num1, num2) {
  return num1 + num2;
}

console.log(add("1", 2));
```

`-`

- the console will log `12`
- will not throw runtime error
- but might be a logical error
- possible mitigation: validate & sanitize user input
- wouldn't it be better to discover this during development?

`-`

### Advantages

- types and type-checking
- type-errors are discovered during compilation rather than runtime
- great IDE support that prompts errors even before compilation
- next-gen JS features compiled for older versions

`-`

- adds non-JS features like Interfaces and Generics
- adds meta-programming features like Decorators
- early adoption of new ECMAScript features
- rich configuration options
- great support in 3rd party libs (either they are written in TS types for it are available)

`-`

### Drawbacks

- more typing (in both meanings of the word)
- adds compilation step to the workflow
- can make building the project more complex

---

## Getting started

`-`

### Installing TS

- requires node.js to be installed
- install TS compiler with the following command

```bash
npm install -g typescript
```

`-`

### Basic compilation

- to compile single file run following command

```bash
tsc ${file.name}
```

- to run compilation in watch mode on sigle file

```bash
tsc ${file.name} --watch
```

---

## Basic types

`-`

### Core types, also known to JS

| Type      | Descritption                                            | Example           |
| --------- | ------------------------------------------------------- | ----------------- |
| `number`  | all numbers, no disctintion between integers and floats | `10`, `5.3`       |
| `string`  | all text values                                         | 'Hi, "Hi", \`Hi\` |
| `boolean` | just true/false, no "truthy/falsy" JS nonsense          | `true/false`      |

`-`

| Type     | Descritption                                          | Example     |
| -------- | ----------------------------------------------------- | ----------- |
| `object` | Any JS object, more specific types can be defined     | `{age: 30}` |
| `Array`  | Any JS array, element types can be strict or flexible | `[1,2,3]`   |

`-`

### Core types, TS specific

| Type    | Descritption                              | Example         |
| ------- | ----------------------------------------- | --------------- |
| `Tuple` | Fixed lenght and type array               | `[1,2]`         |
| `Enum`  | Enumerated list of values                 | `enum{NEW,OLD}` |
| `Any`   | Any type possible, disables type checking | `*`             |

`-`

| Type       | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| `Function` | Pointer to function                                                     |
| `unknown`  | When the incoming type is not known                                     |
| `never`    | For functions that don't return (interrupted by error or infinite loop) |

---

## Using types

`-`

### Type assigment

- to assign type use the `: ${type}` syntax

```typescript
// Variables
const number1: number = 1;
// Function parameters
const f1 = (par1: number, par2: string) => {};
// Function return value
const f2 = (n1, n2): nubmer => {};
```

`-`

### Type inference

- TS can infer the type from the context
- it's considered bad practice to specify a type that can be inferred

```typescript
let num1 = 1; //number
let someString = "abc"; //string
```

`-`

### Specific object types

- it is possible to specify object type with keys and type of their value:

```typescript
const person: {
  name: string;
  age: number;
} = {
  name: "Malanius",
  age: 30,
};
```

`-`

### Arrays

- fixed type arrays can be defined as `${type}[]`
- a flexible array can be defined as `any[]`, but you lose type checking

```typescript
const arr: string[];
```

`-`

### Tuples

- tuple in TS is fixed length, fixed type array

- TS check assignment to tuple array to have the correct type
- it is still possible to push to tuple array
- can be defined as:

```typescript
const t: [nubmer, string] = [1, "string"];
```

`-`

### Enums

- works similar as you know from other languages
- definition:

```typescript
enum {
    NEW, //0
    OLD //1
}
```

`-`

- it is possible to define custom ordinals

```typescript
enum {
    NEW = 5, //5
    OLD //6
}
```

`-`

- it is also possible to use a different type than numbers for ordinals

```typescript
enum {
    NEW = 'NEW', //NEW
    OLD
}
```

- be careful with this, always have a good reason to do it

`-`

### The "any" type

- disables type checking
- behaves as plain JS does
- avoid whenever possible (why use TS when you have everything any?)
- possible to configure compilation to mark use of any as error

---

## More on typing

`-`

### Union types

- sometimes, you need to support multiple types in variable, this can be done with union types
- defined as `${type} | ${type}...`
- example:

```typescript
const combine = (input1: number | string, input2: number | string) => {};
```

`-`

### Literal types

- it is possible to add specific value instead of type
- can be combined with union types to allow several values

```typescript
const combine = (
  resultConversion: "as-number" | "as-text";
) => {}
```

`-`

### Type aliases/custom types

- it can be cumbersome to always repeat union types or other complex types
- type aliases allow defining custom types that can be used later
- possible to define an alias for type with `type` keyword

```typescript
type Combinable = number | string;
type Person = {
  name: string,
  age: number;
}
const value: Combinable = 1;
const someone: Person = {...}
```

`-`

### Function return type & void

- each function has a return type, mostly it's inferred by TS
- possible to define return type manually with specifying return types after parameters:
- a function that doesn't return value has a `void` return type (in pure JS `undefined` is returned with `return` statement)
- `undefined` is a valid type in TS, will require `return` in the function

```typescript
const add = (n1: number, n2: number): number => {
  return n1 + n2;
};
```

`-`

### Function type

- used to specify that some variable should hold a function pointer
- function types can be declared as well

```typescript
let combineValues: (a: number, b: number) => number;
```

- it is also possible to define type of `callback` function:

```typescript
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
};
```

`-`

### The "unknown" type

- useful in cases we don't exactly know what will be stored in the variable
- more restrictive than any
- prevents assigning unknown variables to typed ones without type-check
- way better choice than any when input is not known before

`-`

```typescript
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "String";

// userName = userInput; // won't work as unknown can't be assigned to string
//TS detects this check and allows assignment of the unknown type to string

if (typeof userInput === "string") {
  userName === userInput;
}
```

`-`

### Never type

- specifies that function doesn't return anything, even default undefined
- useful when function always throws an error or has an infinite loop

```typescript
const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
};
```

---

## TS compiler & configuration

`-`

### Initializing TS project

- to be able to use TS configuration and watch mode on whole project, you first need to initialize it:

```bash
tsc --init
```

- then you can use `tsc` to compile whole project single time or `tsc --watch` to run the compiler in watch mode
- `tsconfig.json` file is created where you can configure the compiler

`-`

### Configuration options

- `target`
  - target version of JavaScript the TS files are compiled to
  - can be disabled if you use other transpilation tools (like `babel`)
- `lib`
  - specifies librarires TS should know
  - defaults to libs ad DOM APIs for web
- `allowJs` and `checkJs`

`-`

- `sourceMap`
  - allows to compile and check vanilla JS files
  - enable source map generation for debugging
- `outDir`
  - where compiled files will be put
  - keeps source directory structure
- `rootDir`
  - where is the sources root folder (typically `src`)

`-`

- `emmitComments`
  - should include comments in compiled files
- `noEmmit`
  - will not produce JS files, use TS just for checking
- `noEmmitOnError`
  - will not produce compiled files if errors are present
- `strict`
  - will enable/disable strict compilation checks
  - possible to specify them one by one as required

---

## TS & next-gen JS

//TODO

---

## Classes

//TODO

---

## Interfaces

//TODO

---

## Advanced types

//TODO

---

## Generics

//TODO

---

## Decorators

//TODO

---

## Modules & namespaces

//TODO

---

## TS & webpack

//TODO

---

## TS & 3rd party libs

//TODO

---

## TS & React

//TODO

---

## TS & node.js w/ Express

//TODO

---

## Useful resources

- [TypeScript documentation](https://www.typescriptlang.org/docs/home)
- [Understaning TypeScript by Maximilian Schwarzmüller](https://www.udemy.com/course/understanding-typescript/)
- [This presentation and examples](https://github.com/Malanius/understanding-typescript-course)
