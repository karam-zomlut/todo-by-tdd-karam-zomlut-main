const {todoFunctions, todosArray} = require("./logic");

test("Testing Add To Do Function", function () {
  let actual = todoFunctions.addTodo(["Karam", "Hani"], "Zomlut");
  let expected = ["Karam", "Hani", "Zomlut"];

  expect(expected).toEqual(actual);
});


test("Testing Delete From To Do Function", function () {
  let actual = todoFunctions.deleteTodo(todosArray, 1);
  let expected = [
    { id: 0, description: "make tea", done: false },
];

  expect(expected).toEqual(actual);
});

test("Testing Complete To Do Function", function () {
  let actual = todoFunctions.markTodo(todosArray, 1);
  let expected = [
    { id: 0, description: "make tea", done: false },
    { id: 1, description: "make eggs", done: false },
];

  expect(expected).toEqual(actual);
});

// make sure to test all functions in logic.js below
