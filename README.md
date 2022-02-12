# Project

#### This project is from [Founders and Coders ](https://github.com/GSG-G8/master-reference/tree/master/coursebook/week-2/project)

## Use TDD to build a To-do app

The aim for this project is to build a basic To-do app. This file will help you get started and give you an introduction to unit testing and TDD for client-side code.

This project is split into three parts:

1. Use TDD to create the logic needed to modify your to-do list. This code will not interact with the DOM. Write your tests in `skeleton/test.js`
2. Render the to-do list to the DOM
3. Add your own features

**Don't forget all is about TDD and pure function!**

## Setup

- this repo is already a private one, make sure to not change the repository visibility.
- to clone this repo as it's a private repo, You have to create a personal access token instead of using your own password, follow instruction For [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and make sure to copy your generated token as you can't access it after.
- Read through `skeleton/logic.js`. Don't worry if it does not all makes sense at first.
- `npm init`, then install jest and anything else you want to test with.
- Open `skeleton/index.html` with live server, to test things out.
- work on `main` branch and make sure to **push every 30 minutes**, So nothing lost.

## The project

### User stories:

As a disorganized person I want to:

- enter tasks I need to do into a web page so that I don't forget them
- view the tasks I have added in a list so that I can plan my day
- mark tasks as complete so that I can focus on the tasks I have left
- the to-dos to be large enough so that I don't hit the wrong one with my thumb

#### Potential stretch goals

As a disorganized person I want to:

- edit my to-dos so that I can amend them if the task changes
- click on any part of a to-do to mark it as complete so that it's easier for me to check to-dos off
- a visual indication of which to-do I'm about to interact with so that it's clear what I'm editing

### Part one: create some pure functions

For the first part of the project you will be creating three functions using TDD. You do not need to understand the rest of the code to complete this. The three functions can be thought of in isolation to the rest of the project.

These functions are in the `todoFunctions` object in `logic.js`

#### What is a to-do array? What is a to-do?

We will represent a todo as an object with three properties:

```js
{
  id: 0, // this is a unique number, it will be needed to find a to-do in a to-do list
  description: "make tea", // this is a string that describes what you need to do
  done: false, // This is true or false, it tells us whether a todo is done or not
};
```

We will represent a to-do array as an array of todo objects:

```js
[
  {
    id: 0,
    description: "smash avocados",
    done: true,
  },
  {
    id: 1,
    description: "make coffee",
    done: false,
  },
];
```

#### What does generateId do?

You do not need to understand this function. Each time you call generateId it will give you a unique number!

#### What does cloneArrayOfObjects do?

Makes a copy of your array of objects, so that if you make changes to the new array or its objects, the original remains unchanged.

##### Why do we need cloneArrayOfObjects?

If you try to copy an array or object by using `=`, then what you are creating is not a new array or an object but a _reference_ to it.
So in the code:

```js
const mondayFood = { breakfast: "porridge", lunch: "pizza", dinner: "paella" };
const tuesdayFood = mondayFood;
```

`tuesdayFood` is not an object itself, but an instruction that points towards `mondayFood`. If you try and change something in `tuesdayFood`, what you're actually doing is directing the code to `mondayFood`.
So the instruction `tuesdayFood.lunch = 'pasta';` would actually mean:

> 'Look up the thing 'tuesdayFood' is referencing, and change the 'lunch' property.'

And because `tuesdayFood` is a reference to `mondayFood`, you'll end up changing `mondayFood` - specifically, `mondayFood` lunch'. And you'd miss out on your pizza:

```js
const mondayFood = { breakfast: "porridge", lunch: "pizza", dinner: "paella" };
const tuesdayFood = mondayFood;

tuesdayFood.lunch = "pasta";
console.log(mondayFood); // {breakfast: 'porridge', lunch: 'pasta', dinner: 'paella'}
console.log(tuesdayFood); // {breakfast: 'porridge', lunch: 'pasta', dinner: 'paella'}
```

If you want to make a clone of the object, you can use JSON.parse(JSON.stringify(...));

```js
const tuesdayFood = JSON.parse(JSON.stringify(mondayFood));
```

Now, 'tuesdayFood' refers to a separate object than 'mondayFood' (at the moment, they are separate and identical). So this time, when you try and change 'tuesdayFood', the execution goes nowhere near 'mondayFood'. So, this time, changing 'tuesdayFood.lunch' changes the new tuesdayFood object, and not the existing mondayFood one.

```js
const mondayFood = { breakfast: "porridge", lunch: "pizza", dinner: "paella" };
const tuesdayFood = JSON.parse(JSON.stringify(mondayFood));

tuesdayFood.lunch = "pasta";
console.log(mondayFood); // {breakfast: 'porridge', lunch: 'pizza', dinner: 'paella'}
console.log(tuesdayFood); // {breakfast: 'porridge', lunch: 'pasta', dinner: 'paella'}
```

`JSON.parse(JSON.stringify(...))` is a bit hacky, and when you're using ES6, you'll find out about Object.assign()...

What solution you'll choose for cloning in the future will depend on whatever your cloning needs are. This time, we've used an `Array.map` to clone the outer array containing the to-do tasks, and within that, we used `JSON.parse(JSON.stringify(...))` to clone each of the objects inside.

#### Functions that manage a todoList

##### `addTodo`

Add to-do takes two arguments, a to-do array and a to-do element. The to-do element may be missing some of the data that a to-do needs.

```js
const todos = [];
const newTodo = {
  description: "make smoothie out of things that should really be cooked",
};
const updatedTodos = todoFunctions.addTodo(todos, newTodos);
console.log(updatedTodos);
//  [
//    {
//      id: 0,
//      description: make smoothie out of things that should really be cooked,
//      done: false,
//    }
//  ]
```

```js
const todos = [{ description: "make tea" }];
const makeEggs = { description: "make eggs" };
const updatedTodos = todoFunctions.addTodo(todos, makeEggs);
console.log(updatedTodos);
//  [
//    {
//      description: 'make tea',
//    },
//    {
//      id: 0,
//      description: 'make eggs',
//      done: false,
//     }
//  ]
console.log(todos); // [{ description: 'make tea' }]
```

##### `markTodo`

`markTodo` marks as to-do as completed.

```js
const todos = [
  { id: 0, description: "make tea", done: false },
  { id: 1, description: "make eggs", done: true },
];
todoFunctions.markTodo(todos, 0);
// [
//   {id: 0, description: 'make tea', done: true},
//   {id: 1, description: 'make eggs', done: true},
// ]
todoFunctions.markTodo(todos, 1);
// [
//   {id: 0, description: 'make tea', done: false},
//   {id: 1, description: 'make eggs', done: false},
// ]
```

### Part 2: use the TDD functions to build the app!

#### `createTodoNode`

All is set for you, there're few missings event handler, So all you need to do is to complete what `addEventListener` start to do!

Follow comments you'll never lost.

#### Create new todo

see: `addTodoForm.addEventListener('submit', function(event) {`

Inside this function you need to create a new state with a new to-do.

### Part 3: have fun!

You can add features, like filtering by completed or editing descriptions.
