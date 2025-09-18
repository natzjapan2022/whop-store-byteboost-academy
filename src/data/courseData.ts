export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: "video" | "text" | "quiz" | "project";
  content: {
    description: string;
    videoUrl?: string;
    textContent?: string;
    quizQuestions?: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
    projectInstructions?: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  unlocked: boolean;
}

export const courseModules: Module[] = [
  {
    id: "fundamentals",
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript programming",
    progress: 0,
    unlocked: true,
    lessons: [
      {
        id: "1",
        title: "Variables and Data Types",
        duration: "12 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Learn about JavaScript variables, primitive data types, and how to work with them effectively.",
          videoUrl: "/videos/fundamentals/variables-and-data-types.mp4",
          textContent: `
# Variables and Data Types in JavaScript

## What are Variables?
Variables are containers that store data values. In JavaScript, you can declare variables using \`let\`, \`const\`, or \`var\`.

## Data Types
JavaScript has several primitive data types:

### 1. Number
\`\`\`javascript
let age = 25;
let price = 99.99;
\`\`\`

### 2. String
\`\`\`javascript
let name = "John Doe";
let message = 'Hello World';
\`\`\`

### 3. Boolean
\`\`\`javascript
let isActive = true;
let isComplete = false;
\`\`\`

### 4. Undefined
\`\`\`javascript
let data;
console.log(data); // undefined
\`\`\`

### 5. Null
\`\`\`javascript
let result = null;
\`\`\`

## Variable Declaration
\`\`\`javascript
// Using let (block-scoped, can be reassigned)
let count = 0;
count = 1;

// Using const (block-scoped, cannot be reassigned)
const PI = 3.14159;

// Using var (function-scoped, can be reassigned)
var oldStyle = "not recommended";
\`\`\`

## Best Practices
- Use \`const\` by default
- Use \`let\` when you need to reassign the variable
- Avoid \`var\` in modern JavaScript
- Use descriptive variable names
          `,
        },
      },
      {
        id: "2",
        title: "Functions and Scope",
        duration: "18 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Understand how to create and use functions, and learn about scope in JavaScript.",
          videoUrl: "/videos/fundamentals/functions-and-scope.mp4",
          textContent: `
# Functions and Scope

## Function Declarations
\`\`\`javascript
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Alice")); // "Hello, Alice!"
\`\`\`

## Function Expressions
\`\`\`javascript
const add = function(a, b) {
    return a + b;
};

console.log(add(5, 3)); // 8
\`\`\`

## Arrow Functions
\`\`\`javascript
const multiply = (a, b) => a * b;

const square = x => x * x;

const sayHello = () => "Hello!";
\`\`\`

## Scope
Scope determines where variables can be accessed in your code.

### Global Scope
\`\`\`javascript
let globalVar = "I'm global";

function test() {
    console.log(globalVar); // Accessible
}
\`\`\`

### Function Scope
\`\`\`javascript
function example() {
    let localVar = "I'm local";
    console.log(localVar); // Accessible
}

// console.log(localVar); // Error! Not accessible
\`\`\`

### Block Scope
\`\`\`javascript
if (true) {
    let blockVar = "I'm in a block";
    console.log(blockVar); // Accessible
}

// console.log(blockVar); // Error! Not accessible
\`\`\`
          `,
        },
      },
      {
        id: "3",
        title: "Objects and Arrays",
        duration: "22 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Learn how to work with objects and arrays, the fundamental data structures in JavaScript.",
          textContent: `
# Objects and Arrays

## Objects
Objects are collections of key-value pairs.

\`\`\`javascript
const person = {
    name: "John",
    age: 30,
    city: "New York",
    hobbies: ["reading", "coding", "gaming"]
};

// Accessing properties
console.log(person.name); // "John"
console.log(person["age"]); // 30

// Adding properties
person.email = "john@example.com";

// Deleting properties
delete person.city;
\`\`\`

## Arrays
Arrays are ordered lists of values.

\`\`\`javascript
const fruits = ["apple", "banana", "orange"];

// Accessing elements
console.log(fruits[0]); // "apple"

// Adding elements
fruits.push("grape");
fruits.unshift("strawberry"); // Add to beginning

// Removing elements
const lastFruit = fruits.pop(); // Remove from end
const firstFruit = fruits.shift(); // Remove from beginning

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
\`\`\`

## Nested Structures
\`\`\`javascript
const company = {
    name: "Tech Corp",
    employees: [
        { name: "Alice", department: "Engineering" },
        { name: "Bob", department: "Marketing" }
    ],
    location: {
        city: "San Francisco",
        country: "USA"
    }
};

console.log(company.employees[0].name); // "Alice"
console.log(company.location.city); // "San Francisco"
\`\`\`
          `,
        },
      },
      {
        id: "4",
        title: "Control Structures",
        duration: "15 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Master conditional statements and loops to control the flow of your programs.",
          textContent: `
# Control Structures

## Conditional Statements

### If/Else
\`\`\`javascript
const age = 18;

if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("You cannot vote yet.");
}
\`\`\`

### Switch Statement
\`\`\`javascript
const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular day");
}
\`\`\`

## Loops

### For Loop
\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(\`Iteration \${i}\`);
}
\`\`\`

### While Loop
\`\`\`javascript
let count = 0;
while (count < 3) {
    console.log(\`Count: \${count}\`);
    count++;
}
\`\`\`

### For...of Loop (Arrays)
\`\`\`javascript
const colors = ["red", "green", "blue"];

for (const color of colors) {
    console.log(color);
}
\`\`\`

### For...in Loop (Objects)
\`\`\`javascript
const person = { name: "Alice", age: 25, city: "Boston" };

for (const key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}
\`\`\`

## Ternary Operator
\`\`\`javascript
const message = age >= 18 ? "Adult" : "Minor";
console.log(message);
\`\`\`
          `,
        },
      },
      {
        id: "5",
        title: "Error Handling",
        duration: "16 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Learn how to handle errors gracefully in your JavaScript applications.",
          textContent: `
# Error Handling

## Try/Catch/Finally
\`\`\`javascript
try {
    // Code that might throw an error
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // Handle the error
    console.error("An error occurred:", error.message);
} finally {
    // This always runs
    console.log("Cleanup code here");
}
\`\`\`

## Throwing Custom Errors
\`\`\`javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

try {
    const result = divide(10, 0);
} catch (error) {
    console.error(error.message);
}
\`\`\`

## Error Types
\`\`\`javascript
// TypeError
try {
    null.someMethod();
} catch (error) {
    if (error instanceof TypeError) {
        console.log("Type error occurred");
    }
}

// ReferenceError
try {
    console.log(undefinedVariable);
} catch (error) {
    if (error instanceof ReferenceError) {
        console.log("Reference error occurred");
    }
}
\`\`\`

## Best Practices
- Always handle errors appropriately
- Provide meaningful error messages
- Use try/catch for async operations
- Log errors for debugging
- Don't ignore errors silently
          `,
        },
      },
      {
        id: "6",
        title: "Practice: Building a Calculator",
        duration: "45 min",
        completed: false,
        locked: false,
        type: "project",
        content: {
          description:
            "Build a functional calculator using JavaScript fundamentals.",
          projectInstructions: `
# Project: JavaScript Calculator

## Objective
Create a basic calculator that can perform arithmetic operations.

## Requirements
1. Create functions for basic operations: add, subtract, multiply, divide
2. Handle user input validation
3. Implement error handling for division by zero
4. Create a simple interface (console-based is fine)

## Starter Code
\`\`\`javascript
// Calculator functions
function add(a, b) {
    // Your code here
}

function subtract(a, b) {
    // Your code here
}

function multiply(a, b) {
    // Your code here
}

function divide(a, b) {
    // Your code here
    // Remember to handle division by zero!
}

function calculate(operation, num1, num2) {
    // Your code here
    // Call the appropriate function based on operation
}

// Test your calculator
console.log(calculate('add', 5, 3)); // Should return 8
console.log(calculate('divide', 10, 0)); // Should handle error
\`\`\`

## Bonus Challenges
- Add support for more operations (power, square root)
- Create a history feature to track calculations
- Add input validation to ensure numbers are valid

## Expected Output
- Basic arithmetic operations working correctly
- Proper error handling
- Clean, readable code with comments
          `,
        },
      },
    ],
  },
  {
    id: "dom",
    title: "DOM Manipulation & Events",
    description: "Learn to interact with web pages dynamically",
    progress: 0,
    unlocked: true,
    lessons: [
      {
        id: "7",
        title: "Understanding the DOM",
        duration: "20 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Learn what the DOM is and how to interact with HTML elements using JavaScript.",
          textContent: `
# Understanding the DOM

## What is the DOM?
The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.

## DOM Tree Structure
\`\`\`
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── h1
        ├── p
        └── div
            ├── span
            └── button
\`\`\`

## Selecting Elements
\`\`\`javascript
// By ID
const header = document.getElementById('main-header');

// By class name
const buttons = document.getElementsByClassName('btn');

// By tag name
const paragraphs = document.getElementsByTagName('p');

// CSS selectors (modern approach)
const element = document.querySelector('#main-header');
const elements = document.querySelectorAll('.btn');
\`\`\`

## Modifying Elements
\`\`\`javascript
// Change text content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// Change attributes
element.setAttribute('class', 'new-class');
element.id = 'new-id';

// Change styles
element.style.color = 'blue';
element.style.fontSize = '18px';
\`\`\`
          `,
        },
      },
      {
        id: "8",
        title: "Selecting Elements",
        duration: "14 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Master different methods for selecting and targeting HTML elements.",
          textContent: `
# Selecting DOM Elements

## querySelector vs querySelectorAll
\`\`\`javascript
// querySelector - returns first match
const firstButton = document.querySelector('button');
const mainNav = document.querySelector('#main-nav');
const firstCard = document.querySelector('.card');

// querySelectorAll - returns all matches (NodeList)
const allButtons = document.querySelectorAll('button');
const allCards = document.querySelectorAll('.card');

// Convert NodeList to Array for array methods
const cardArray = Array.from(allCards);
\`\`\`

## Complex Selectors
\`\`\`javascript
// Descendant selectors
const navLinks = document.querySelectorAll('nav a');

// Child selectors
const directChildren = document.querySelectorAll('ul > li');

// Attribute selectors
const emailInputs = document.querySelectorAll('input[type="email"]');

// Pseudo-selectors
const firstChild = document.querySelector('li:first-child');
const lastChild = document.querySelector('li:last-child');
\`\`\`

## Element Properties
\`\`\`javascript
const element = document.querySelector('.example');

// Getting information
console.log(element.tagName);
console.log(element.className);
console.log(element.id);
console.log(element.innerHTML);
console.log(element.textContent);

// Parent/child relationships
console.log(element.parentElement);
console.log(element.children);
console.log(element.firstElementChild);
console.log(element.lastElementChild);
\`\`\`
          `,
        },
      },
      {
        id: "9",
        title: "Event Listeners",
        duration: "25 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Learn how to handle user interactions and events in web applications.",
          textContent: `
# Event Listeners

## Adding Event Listeners
\`\`\`javascript
const button = document.querySelector('#my-button');

// Click event
button.addEventListener('click', function() {
    console.log('Button was clicked!');
});

// Using arrow function
button.addEventListener('click', () => {
    console.log('Button clicked with arrow function!');
});
\`\`\`

## Common Events
\`\`\`javascript
// Mouse events
element.addEventListener('click', handleClick);
element.addEventListener('mouseover', handleMouseOver);
element.addEventListener('mouseout', handleMouseOut);

// Keyboard events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Form events
form.addEventListener('submit', handleSubmit);
input.addEventListener('change', handleChange);
input.addEventListener('input', handleInput);
\`\`\`

## Event Object
\`\`\`javascript
function handleClick(event) {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Mouse position:', event.clientX, event.clientY);

    // Prevent default behavior
    event.preventDefault();

    // Stop event bubbling
    event.stopPropagation();
}
\`\`\`

## Event Delegation
\`\`\`javascript
// Handle clicks on multiple elements efficiently
document.addEventListener('click', function(event) {
    if (event.target.matches('.delete-button')) {
        // Handle delete button click
        console.log('Delete button clicked');
    }

    if (event.target.matches('.edit-button')) {
        // Handle edit button click
        console.log('Edit button clicked');
    }
});
\`\`\`
          `,
        },
      },
      {
        id: "10",
        title: "Dynamic Content Creation",
        duration: "18 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Learn how to create, modify, and remove HTML elements dynamically.",
          textContent: `
# Dynamic Content Creation

## Creating Elements
\`\`\`javascript
// Create a new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World!';
newDiv.className = 'my-class';
newDiv.id = 'my-id';

// Add to the page
document.body.appendChild(newDiv);
\`\`\`

## Modifying Content
\`\`\`javascript
const element = document.querySelector('#my-element');

// Change text content
element.textContent = 'New text content';

// Change HTML content
element.innerHTML = '<strong>Bold text</strong>';

// Modify attributes
element.setAttribute('data-value', '123');
element.removeAttribute('old-attribute');

// Change styles
element.style.color = 'blue';
element.style.fontSize = '18px';
element.style.display = 'none';
\`\`\`

## Working with Classes
\`\`\`javascript
const element = document.querySelector('.my-element');

// Add classes
element.classList.add('active');
element.classList.add('highlighted', 'important');

// Remove classes
element.classList.remove('old-class');

// Toggle classes
element.classList.toggle('visible');

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}
\`\`\`

## Removing Elements
\`\`\`javascript
const element = document.querySelector('#to-remove');

// Remove from parent
element.parentNode.removeChild(element);

// Modern way (if supported)
element.remove();
\`\`\`
          `,
        },
      },
      {
        id: "11",
        title: "Form Validation",
        duration: "30 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description:
            "Implement client-side form validation for better user experience.",
          textContent: `
# Form Validation

## Basic Form Handling
\`\`\`javascript
const form = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Validate form
    if (validateForm()) {
        console.log('Form is valid, submit data');
        // Submit form data here
    }
});
\`\`\`

## Input Validation Functions
\`\`\`javascript
function validateForm() {
    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
\`\`\`

## Error Display
\`\`\`javascript
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());

    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}
\`\`\`

## Real-time Validation
\`\`\`javascript
emailInput.addEventListener('input', function() {
    const email = this.value;

    if (email && !isValidEmail(email)) {
        this.classList.add('invalid');
    } else {
        this.classList.remove('invalid');
    }
});
\`\`\`
          `,
        },
      },
      {
        id: "12",
        title: "Project: Interactive To-Do App",
        duration: "60 min",
        completed: false,
        locked: false,
        type: "project",
        content: {
          description:
            "Build a complete to-do application using DOM manipulation and events.",
          projectInstructions: `
# Project: Interactive To-Do App

## Objective
Create a fully functional to-do list application with add, edit, delete, and mark complete functionality.

## Features to Implement
1. Add new tasks
2. Mark tasks as complete/incomplete
3. Edit existing tasks
4. Delete tasks
5. Filter tasks (all, active, completed)
6. Task counter
7. Clear all completed tasks

## HTML Structure
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <div class="input-section">
            <input type="text" id="task-input" placeholder="Add a new task...">
            <button id="add-btn">Add Task</button>
        </div>
        <div class="filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
        <ul id="task-list"></ul>
        <div class="footer">
            <span id="task-count">0 tasks remaining</span>
            <button id="clear-completed">Clear Completed</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
\`\`\`

## JavaScript Implementation
\`\`\`javascript
class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.initElements();
        this.bindEvents();
        this.render();
    }

    initElements() {
        this.taskInput = document.getElementById('task-input');
        this.addBtn = document.getElementById('add-btn');
        this.taskList = document.getElementById('task-list');
        this.taskCount = document.getElementById('task-count');
        this.clearBtn = document.getElementById('clear-completed');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        this.clearBtn.addEventListener('click', () => this.clearCompleted());

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.render();
    }

    // Add more methods here...
}

// Initialize the app
const app = new TodoApp();
\`\`\`

## Requirements
- Use event delegation for task actions
- Implement proper form validation
- Make the UI responsive
- Add smooth animations/transitions
- Store tasks in localStorage (bonus)

## Expected Outcome
A fully functional to-do application demonstrating mastery of DOM manipulation, event handling, and JavaScript fundamentals.
          `,
        },
      },
    ],
  },
  {
    id: "react",
    title: "React Framework",
    description: "Build modern user interfaces with React",
    progress: 0,
    unlocked: false,
    lessons: [
      {
        id: "13",
        title: "Introduction to React",
        duration: "25 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description: "Get started with React and understand component-based architecture.",
          textContent: `
# Introduction to React

## What is React?
React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Meta and the open-source community.

## Key Concepts

### Components
React applications are built using components - reusable pieces of UI.

\`\`\`javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

### JSX
JSX is a syntax extension for JavaScript that looks similar to HTML.

\`\`\`jsx
const element = <h1>Hello, World!</h1>;
\`\`\`

### Virtual DOM
React uses a virtual representation of the DOM for efficient updates.

## Getting Started
\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First Component
\`\`\`jsx
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React!</h1>
      <p>This is your first React component.</p>
    </div>
  );
}

export default App;
\`\`\`
          `,
        },
      },
      {
        id: "14",
        title: "Components and JSX",
        duration: "30 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description: "Learn how to create and use React components with JSX syntax.",
          textContent: `
# Components and JSX

## Functional Components
Modern React primarily uses functional components.

\`\`\`jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}
\`\`\`

## JSX Rules
- Must return a single parent element
- Use className instead of class
- Close all tags

\`\`\`jsx
function Card() {
  return (
    <div className="card">
      <img src="image.jpg" alt="Description" />
      <h3>Card Title</h3>
      <p>Card content goes here.</p>
    </div>
  );
}
\`\`\`

## Props
Pass data to components using props.

\`\`\`jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// Usage
const user = { name: "John", email: "john@example.com", avatar: "avatar.jpg" };
<UserCard user={user} />
\`\`\`
          `,
        },
      },
      {
        id: "15",
        title: "State and Effects",
        duration: "35 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description: "Master React hooks for state management and side effects.",
          textContent: `
# State and Effects

## useState Hook
Manage component state with the useState hook.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook
Handle side effects like API calls, subscriptions, and DOM manipulation.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`
          `,
        },
      },
      {
        id: "16",
        title: "Project: React Todo App",
        duration: "90 min",
        completed: false,
        locked: false,
        type: "project",
        content: {
          description: "Build a complete todo application using React hooks and components.",
          projectInstructions: `
# Project: React Todo App

## Objective
Create a fully functional todo application using React with add, edit, delete, and filter functionality.

## Requirements
1. Add new todos
2. Mark todos as complete/incomplete
3. Edit existing todos
4. Delete todos
5. Filter todos (all, active, completed)
6. Persist data in localStorage

## Component Structure
\`\`\`
App
├── TodoForm
├── TodoList
│   └── TodoItem
└── FilterButtons
\`\`\`

## Starter Code
\`\`\`jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  // Implement remaining functions...

  return (
    <div className="App">
      <h1>React Todo App</h1>
      {/* Add your components here */}
    </div>
  );
}

export default App;
\`\`\`

## Features to Implement
- Real-time todo filtering
- Edit mode for todos
- Todo counter
- Clear completed button
- Responsive design
- Local storage persistence

## Expected Outcome
A production-ready React todo application demonstrating component composition, state management, and React best practices.
          `,
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced JavaScript & Tools",
    description: "Master advanced concepts and modern development tools",
    progress: 0,
    unlocked: false,
    lessons: [
      {
        id: "17",
        title: "ES6+ Modern Features",
        duration: "32 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description: "Explore modern JavaScript features from ES6 and beyond.",
          textContent: `
# ES6+ Modern Features

## Arrow Functions
\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter
const square = x => x * x;

// With no parameters
const getRandomNumber = () => Math.random();
\`\`\`

## Destructuring
\`\`\`javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, city = 'Unknown' } = person;

// Function parameters
function greet({ name, age }) {
  return \`Hello \${name}, you are \${age} years old\`;
}
\`\`\`

## Template Literals
\`\`\`javascript
const name = 'Alice';
const age = 30;

// Multi-line strings
const message = \`
  Hello \${name}!
  You are \${age} years old.
  Welcome to our platform.
\`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
  }, '');
}

const highlighted = highlight\`Hello \${name}, you are \${age} years old\`;
\`\`\`

## Spread and Rest Operators
\`\`\`javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Rest operator
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`
          `,
        },
      },
      {
        id: "18",
        title: "Async/Await & Promises",
        duration: "28 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description: "Master asynchronous JavaScript with Promises and async/await.",
          textContent: `
# Async/Await & Promises

## Promise Basics
\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({ data: 'Hello World', status: 'success' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};

// Using .then()
fetchData()
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

## Async/Await
\`\`\`javascript
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Multiple async operations
async function fetchMultipleData() {
  try {
    // Sequential
    const user = await fetchUser();
    const posts = await fetchUserPosts(user.id);

    // Parallel
    const [profile, settings] = await Promise.all([
      fetchUserProfile(user.id),
      fetchUserSettings(user.id)
    ]);

    return { user, posts, profile, settings };
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
\`\`\`

## Error Handling
\`\`\`javascript
async function robustFetch(url) {
  const maxRetries = 3;
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      console.log(\`Attempt \${i + 1} failed:, error.message\`);

      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  throw lastError;
}
\`\`\`
          `,
        },
      },
      {
        id: "19",
        title: "Module Systems & Build Tools",
        duration: "25 min",
        completed: false,
        locked: false,
        type: "video",
        content: {
          description: "Learn about ES6 modules, npm, and modern build tools.",
          textContent: `
# Module Systems & Build Tools

## ES6 Modules
\`\`\`javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export default function multiply(a, b) {
  return a * b;
}

// app.js
import multiply, { PI, add } from './math.js';
import * as math from './math.js';

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(math.PI); // 3.14159
\`\`\`

## NPM Basics
\`\`\`bash
# Initialize project
npm init -y

# Install dependencies
npm install lodash axios

# Install dev dependencies
npm install --save-dev webpack babel-core

# Install globally
npm install -g create-react-app

# Run scripts
npm run build
npm run dev
npm start
\`\`\`

## Package.json
\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "webpack": "^5.70.0",
    "babel-loader": "^8.2.0"
  }
}
\`\`\`

## Webpack Configuration
\`\`\`javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
\`\`\`
          `,
        },
      },
      {
        id: "20",
        title: "Final Capstone Project",
        duration: "180 min",
        completed: false,
        locked: false,
        type: "project",
        content: {
          description: "Build a complete full-stack web application using all skills learned.",
          projectInstructions: `
# Final Capstone Project: Task Management System

## Objective
Create a comprehensive task management application that demonstrates mastery of JavaScript, DOM manipulation, React, and modern development practices.

## Project Requirements

### Core Features
1. **User Interface**
   - Clean, responsive design
   - Dark/light theme toggle
   - Intuitive navigation

2. **Task Management**
   - Create, read, update, delete tasks
   - Task categories and priorities
   - Due dates and reminders
   - Search and filter functionality

3. **Data Persistence**
   - Local storage for offline functionality
   - Import/export capabilities
   - Data validation and error handling

4. **Advanced Features**
   - Drag and drop task reordering
   - Bulk operations
   - Statistics and analytics
   - Keyboard shortcuts

### Technical Requirements
1. **Frontend**
   - React with hooks
   - Component-based architecture
   - State management
   - Responsive CSS

2. **JavaScript**
   - ES6+ features
   - Async/await for operations
   - Error handling
   - Code organization

3. **Build Tools**
   - Webpack or Vite setup
   - Development server
   - Production build
   - Code splitting

### Deliverables
1. **Source Code**
   - Well-organized file structure
   - Clean, commented code
   - README with setup instructions

2. **Demo**
   - Live demo or video walkthrough
   - Feature demonstration
   - Performance considerations

3. **Documentation**
   - Architecture decisions
   - API documentation
   - User guide

## Evaluation Criteria
- Code quality and organization
- Feature completeness
- User experience
- Performance optimization
- Documentation quality

## Timeline
- Week 1: Planning and setup
- Week 2-3: Core features development
- Week 4: Advanced features and polish
- Week 5: Testing and documentation

## Resources
- React documentation
- MDN JavaScript reference
- Modern JavaScript features guide
- CSS frameworks (optional)

This project should showcase your complete understanding of modern JavaScript development and serve as a portfolio piece for potential employers.
          `,
        },
      },
    ],
  },
];

// Progress tracking functions
export const getProgress = (): {
  [moduleId: string]: { [lessonId: string]: boolean };
} => {
  const saved = localStorage.getItem("courseProgress");
  return saved ? JSON.parse(saved) : {};
};

export const saveProgress = (
  moduleId: string,
  lessonId: string,
  completed: boolean
): void => {
  const progress = getProgress();
  if (!progress[moduleId]) {
    progress[moduleId] = {};
  }
  progress[moduleId][lessonId] = completed;
  localStorage.setItem("courseProgress", JSON.stringify(progress));
};

export const getModuleProgress = (
  moduleId: string,
  lessons: Lesson[]
): number => {
  const progress = getProgress();
  const moduleProgress = progress[moduleId] || {};
  const completedLessons = lessons.filter(
    (lesson) => moduleProgress[lesson.id] === true
  ).length;
  return Math.round((completedLessons / lessons.length) * 100);
};

export const getOverallProgress = (modules: Module[]): number => {
  const progress = getProgress();
  let totalLessons = 0;
  let completedLessons = 0;

  modules.forEach((module) => {
    totalLessons += module.lessons.length;
    const moduleProgress = progress[module.id] || {};
    completedLessons += module.lessons.filter(
      (lesson) => moduleProgress[lesson.id] === true
    ).length;
  });

  return totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
};

export const isModuleUnlocked = (
  moduleIndex: number,
  modules: Module[]
): boolean => {
  if (moduleIndex === 0) return true;

  const previousModule = modules[moduleIndex - 1];
  const progress = getProgress();
  const moduleProgress = progress[previousModule.id] || {};

  // Unlock next module when previous module is 50% complete (easier for testing)
  const completedLessons = previousModule.lessons.filter(
    (lesson) => moduleProgress[lesson.id] === true
  ).length;
  const completionRate = completedLessons / previousModule.lessons.length;

  return completionRate >= 0.5;
};
