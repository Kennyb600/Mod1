  // 1. Create variables and store values
let x = 5;
let y = 10;

// 2. Add the numbers together
let sum = x + y;

// 3. Display the result in the <p> element with id="demo"
document.getElementById("demo").textContent = sum;

// Declare all three on one line and assign their prompt values
let firstName = prompt("Enter your first name:"), lastName = prompt("Enter your last name:"), age = prompt("Enter your age:");

// Display the result in an alert box
alert("Name: " + firstName + " " + lastName + "\nAge: " + age);

const myButton = document.getElementById("button1");

myButton.addEventListener("click", function() {
    // Find all <textarea> and <p> elements
    const elements = document.querySelectorAll("textarea, p");

    // Loop through each found element to apply the red border
    elements.forEach(function(el) {
        el.style.border = "2px solid red";
    });
});