// Create a new paragraph (<p> element)
let newParagraph = document.createElement("p");

// Use Template Literals to set the paragraph’s text
let courseName = "Dynamic Websites & Applications";
newParagraph.textContent = `Welcome to the ${courseName} module!`;

// Append the paragraph to the body of the page
document.body.appendChild(newParagraph);