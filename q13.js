// Create an array with some fruit names
let fruits = ["Cherry", "Banana", "Pineapple", "Guava", "Mango" ];

// Get the last item from the array dynamically
let lastItem = fruits[fruits.length - 1];

// Display it inside the <p> element with the ID "demo"
document.getElementById("demo").innerHTML = `The last fruit is: <strong>${lastItem}</strong>`;