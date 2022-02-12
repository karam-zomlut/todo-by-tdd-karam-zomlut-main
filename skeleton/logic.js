// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

const  todosArray = [
    { id: 0, description: "make tea", done: false },
    { id: 1, description: "aege eggs", done: true },
];


const todoFunctions = {
    // todoFunctions.generateId() will give you a unique id
    // You do not need to understand the implementation of this function.
    generateId: (function () {
        let idCounter = 0;
        
        function incrementCounter() {
            return (idCounter += 1);
        }

        return incrementCounter;
    })(),
    
    //cloneArrayOfObjects will create a copy of the todos array
    //changes to the new array don't affect the original
    cloneArrayOfObjects: function (todos) {
        return todos.map(function (todo) {
            return JSON.parse(JSON.stringify(todo));
        });
    },
    
    addTodo: function (todos, newTodo) {
        // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
        // returns a new array, it should contain todos with the newTodo added to the end.
        // add an id to the newTodo. You can use the generateId function to create an id.
        // hint: array.concat

        copyOfTodos = this.cloneArrayOfObjects(todos).concat(newTodo);
        
        return copyOfTodos;
    },
    deleteTodo: function (todos, idToDelete) {
        // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
        // return a new array, this should not contain any todo with an id of idToDelete
        // hint: array.filter
        
        copyOfTodos = this.cloneArrayOfObjects(todos);
        copyOfTodos = copyOfTodos.filter(todo => todo.id != idToDelete);

        return copyOfTodos;
    },
    markTodo: function (todos, idToMark) {
        // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
        // in the new todo array, all elements will remain unchanged except the one with id: idToMark
        // this element will have its done value toggled
        // hint: array.map

        copyOfTodos = this.cloneArrayOfObjects(todos);

        let thisTask = copyOfTodos.filter(todo => todo.id == idToMark);
        thisTask[0].done ? thisTask[0].done = false : thisTask[0].done = true;
        
        return copyOfTodos;
    },
    sortTodos: function(todos, sortFunction) {
        return this.cloneArrayOfObjects(todos).sort((x, y) => sortFunction(x, y));
    },
    sortByName: (task1, task2) => {
        if (task1.description.toLowerCase() < task2.description.toLowerCase()) return -1;
        if (task1.description.toLowerCase() > task2.description.toLowerCase()) return 1;
        return 0;
    },
    sortById: (task1, task2) => {
        if (task1.id < task2.id) return -1;
        if (task1.id > task2.id) return 1;
        return 0;
    },
    sortByDone: (task1, task2) => {
        if (task1.done < task2.done) return -1;
        if (task1.done > task2.done) return 1;
        return 0;
    },
};
let copyOfTodos = todoFunctions.cloneArrayOfObjects(todosArray);

// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined") {
    module.exports = {
        todosArray,
        todoFunctions
    };
}
