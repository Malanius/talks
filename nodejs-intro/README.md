# Node.js

JavaScript on the server

---

## JavaScript refresher

`-`

- language created in 1995 created for web development
- weakly typed
  - no explicit type assigment
  - data types can be switched dynamically
- object oriented
  - data can be organized in logical objects
  - has primitive and reference types

`-`

- runs in the web browser that contains JS engine
  - Chrome/Chromium - [V8](https://v8.dev/)
  - Firefox - [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
  - Safari - [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) (a.k.a Nitro, SquirrelFish and SquirrelFish Extreme)
  - Edge - formerly [Chakra](https://github.com/microsoft/ChakraCore), switched to [V8](https://v8.dev/)
- more on JS engines and V8 insides [here](https://blog.bitsrc.io/javascript-engines-an-overview-2162bffa1187)

---

## What is Node.js

Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser (excerpt from Node.js).

`-`

- Node.js was written initially by Ryan Dahl in 2009
- JS runtime based on V8
- runs JS as proccess on the computer
- doesn't require web browser to run
- used for scripting and building server-side applications
- allows to write FE & BE in single language
- adds additional features to V8

`-`

### Node.js characteristics

1. With Node.js, you can write server-side code with JavaScript
1. Is not limited to the server - you can use it for utility scripts or for building tools
1. Uses an event driven code for running your logic. Because of that, JavaScript thread is always free to handle new events and new incoming requests.

`-`

### Additional features

- `modules`
  - objects referring to the functionality that will be exported from a file (each file is treated as a module)
  - node has many pre-build modules for common tasks - http, https, file system, os, path
- `require()` - function used to import modules from other files or Node packages
- `process` - object referencing to the actual computer process, allows for access to command-line arguments, environment variables and so on
- non-blocking I/O (file system, HTTP requests)

---

## Installing Node.js

`-`

### Bad way

- [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- you'll soon find that each project may require different node version...

`-`

### Better way

- using nvm (node version manager)
- Linux [nvm](https://github.com/nvm-sh/nvm)
- Windows [nvm-windows](https://github.com/coreybutler/nvm-windows)
- they work simmilarry, but some commands may differ a bit
- installing node: `nvm install ${version}`
- switching node: `nvm use ${version}`

---

## Node.js Hello World

- start node REPL by `node`
- run snippet `console.log("Hello World")`
- or put it in `.js` file and run it with `node ${file}` or in REPL `.load ${file}`

---

## Simple HTTP server demo

---

## Packages

- lot of useful packages and components can be found at [https://www.npmjs.com/](https://www.npmjs.com/)
- you can manage packages in your app with `npm` or `yarn`

---

## npm

- comes preinstalled with `node`

---

## yarn

---

## Resources

- [Node.js](https://nodejs.org/en/)
- [Beginner's guide to creating a Node.js server](https://dev.to/lisahjung/beginner-s-guide-to-creating-a-node-js-server-3d0j)
- [What is Node](https://www.codecademy.com/articles/what-is-node)
- [What exactly is node](https://www.freecodecamp.org/news/what-exactly-is-node-js-ae36e97449f5/)
- [npm.js](https://www.npmjs.com/)
- [NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno) | Udemy](https://www.udemy.com/course/nodejs-the-complete-guide/)
